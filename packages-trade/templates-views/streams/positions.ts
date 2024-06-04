import {waiverQuery$} from '@/streams/trade/cross-margin';
import {calcLiqPrice} from '@/streams/utils';
import {symbolMapById$} from '@rx/streams/config';
import {priceMap$} from '@rx/streams/rate-price';
import {positionUpdate$} from '@rx/streams/subscription/position';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {updateBalance$} from '@rx/web3/streams/balance';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  timer,
} from 'rxjs';

const source = timer(0, 60 * 1000);

export const query$ = new BehaviorSubject(0);
const loading$ = new BehaviorSubject(false);

positionUpdate$.subscribe((data: any) => {
  if (data?.length > 0) {
    positionUpdate$.clear();
    loading$.next(true);
    query$.next(0);
    waiverQuery$.next(0);
    updateBalance$.next(0);
    data?.forEach((p: any) => {
      Toast.success(`Fill Order ${p.SecurityID} [${p.LastQty}]`);
    });
  }
});
const getPositions$ = combineLatest([rateXClient$, clientReady$, query$, source]).pipe(
  debounceTime(200),
  switchMap(([client, ready]) => load(client, ready)),
  map((res) => {
    loading$.next(false);
    return res;
  }),
  startWith([])
);

export const positions$ = combineLatest([
  getPositions$,
  priceMap$,
  lastTrade$,
  symbolMapById$,
  loading$,
]).pipe(
  debounceTime(1000),
  filter((res) => !res[4]),
  switchMap(([positions, rateMap, trade, symbolMap, loading]: any) =>
    calcPositions(positions, rateMap, trade, symbolMap)
  ),
  startWith([]),
  shareReplay()
);

async function load(client: RateClient, ready: boolean) {
  if (!client || !ready) {
    return [];
  }
  loading$.next(true);
  console.log(new Date(), 'Position Load : ', client.wallet);
  return await client.getAllPositions();
}

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
    let st = Big(y);
    let pnl = Big(0);
    const symbol = symbolMap?.[p.marketIndex] ?? {};
    const rateN = rateMap[symbol?.symbolLevel2Category]?.ratePrice;
    const trade: any = tradeMap?.[symbol?.symbol] ?? {};
    if (rateN && lastRate > 0) {
      const rateNM = Big(rateN).div(lastRate);
      p.rateN = rateN.toFixed(9);

      st = st
        .times(rateN)
        .div(lastRate)
        .add(Big(x).times(rateNM.minus(1)));

      if (trade?.LastPrice) {
        pnl = Big(x)
          .times(Big(trade?.LastPrice).minus(st.div(x).abs()))
          .add(st.add(x).times(rateNM.minus(1)));
      }
    }
    const direction = x > 0 ? 'LONG' : 'SHORT';
    return {
      ...p,
      ...symbol,
      ...trade,
      direction,
      st: y,
      pnl: pnl.toFixed(9),
      quoteAssetAmount: st.toFixed(9),
      entry: x != 0 ? st.div(x).abs().toFixed(9) : 0,
      cr: p.isIsolated ? calcCr([p], tradeMap, symbolMap) : crossCr,
      lipPrice: p.isIsolated
        ? calcLiqPrice(
            direction,
            symbol.minimumMaintainanceCr ?? '1.05',
            x,
            st.toNumber(),
            p.margin
          )
        : '-',
    };
  });
}

export function calcAssetLiability(positions: any[], tradeMap: any, symbolMap: any) {
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
    if (!trade?.LastPrice) {
      continue;
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
  const margin = Object.keys(marginMap).reduce((total, pda) => {
    const value = marginMap[pda];
    return total.add(value);
  }, Big(0));
  return {assets, liability, margin};
}

function calcCr(positions: any[], tradeMap: any, symbolMap: any) {
  const {assets, liability, margin} = calcAssetLiability(positions, tradeMap, symbolMap);
  if (liability.eq(Big(0))) {
    return '';
  }
  return assets.add(margin).div(liability).toFixed(9);
}
