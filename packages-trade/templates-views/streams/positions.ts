import {symbolMapById$} from '@rx/streams/config';
import {priceMap$} from '@rx/streams/rate-price';
import {positionUpdate$} from '@rx/streams/subscription/position';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {
  BehaviorSubject,
  combineLatest,
  shareReplay,
  startWith,
  switchMap,
  throttleTime,
  timer,
} from 'rxjs';

const source = timer(0, 60 * 1000);

export const query$ = new BehaviorSubject(0);
positionUpdate$.subscribe((data: any) => {
  console.log('Position Update : ', data);
  if (data?.length > 0) {
    query$.next(0);
    data?.forEach((p: any) => {
      Toast.success(`Fill Order ${p.SecurityID} [${p.LastQty}]`);
    });
  }
});

const getPositions$ = combineLatest([rateXClient$, query$, source]).pipe(
  throttleTime(200),
  switchMap(([client]) => load(client)),
  startWith([]),
  shareReplay()
);

export const positions$ = combineLatest([
  getPositions$,
  priceMap$,
  lastTrade$,
  symbolMapById$,
]).pipe(
  throttleTime(200),
  switchMap(([positions, rateMap, trade, symbolMap]: any) =>
    calcPositions(positions, rateMap, trade, symbolMap)
  ),
  startWith([]),
  shareReplay()
);

async function load(client: RateClient) {
  if (!client || !client?.isReady) {
    return [];
  }
  return await client.getAllPositions();
}

const rateKeyMap: any = {
  9: 'mSOL',
  10: 'JitoSOL',
};
async function calcPositions(
  positions: any[],
  rateMap: any,
  tradeMap: any,
  symbolMap: Record<number, ConfigSymbol>
) {
  const crossPositions = positions.filter((p) => !p.isIsolated);
  const crossCr = calcCr(crossPositions, tradeMap, symbolMap);
  return positions?.map((p) => {
    const {baseAssetAmount: x, quoteAssetAmount: y, lastRate} = p;
    let st = y;
    let pnl = Big(0);
    const rateN = rateMap[rateKeyMap[p.marketIndex]]?.ratePrice;
    const symbol = symbolMap?.[p.marketIndex] ?? {};
    const trade: any = tradeMap?.[symbol?.symbol] ?? {};
    if (rateN && lastRate > 0) {
      const rateNM = Big(rateN).div(lastRate);
      p.rateN = rateN.toFixed(9);

      st = Big(y)
        .times(rateN)
        .div(lastRate)
        .add(Big(x).times(rateNM.minus(1)));

      if (trade?.LastPrice) {
        pnl = Big(x)
          .times(Big(trade?.LastPrice).minus(Math.abs(st / x)))
          .add(st.add(x).times(rateNM.minus(1)));
      }
    }
    return {
      ...p,
      st: y.toFixed(9),
      quoteAssetAmount: st.toFixed(9),
      pnl: pnl.toFixed(9),
      ...symbol,
      ...trade,
      cr: p.isIsolated ? calcCr([p], tradeMap, symbolMap) : crossCr,
    };
  });
}

function calcCr(positions: any[], tradeMap: any, symbolMap: any) {
  let assetYT = Big(0);
  let assetST = Big(0);
  let liabilityYT = Big(0);
  let liabilityST = Big(0);
  let marginMap: any = {};
  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    const symbol = symbolMap?.[p.marketIndex] ?? {};
    const trade: any = tradeMap?.[symbol?.symbol] ?? {};
    if (!marginMap[p.userPda]) {
      marginMap[p.userPda] = Big(p.margin);
    }

    if (p.baseAssetAmount > 0) {
      assetYT = assetYT.add(Big(p.baseAssetAmount).times(trade?.LastPrice));
    } else {
      liabilityYT = liabilityYT.add(Big(Math.abs(p.baseAssetAmount)).times(trade?.LastPrice));
    }

    if (p.quoteAssetAmount > 0) {
      assetST = assetST.add(p.quoteAssetAmount);
    } else {
      liabilityST = liabilityST.add(Math.abs(p.quoteAssetAmount));
    }
  }
  const assets = assetYT.add(assetST);
  const liability = liabilityYT.add(liabilityST);
  if (liability.eq(Big(0))) {
    return '';
  }
  const margin = Object.keys(marginMap).reduce((total, pda) => {
    const value = marginMap[pda];
    return total.add(value);
  }, Big(0));
  const cr = assets.add(margin).div(liability).toFixed(9);
  return cr;
}
