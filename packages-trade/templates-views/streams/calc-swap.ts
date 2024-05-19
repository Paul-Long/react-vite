import {current$} from '@/pages/trade/streams/streams';
import {calcLiqPrice} from '@/streams/utils';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Big} from 'big.js';
import {BehaviorSubject, combineLatest, debounceTime, exhaustMap, map, of, shareReplay} from 'rxjs';

export const order$ = new BehaviorSubject<any>(null);

export const swapLoading$ = new BehaviorSubject(false);
export const swap$ = combineLatest([order$, current$, rateXClient$, clientReady$]).pipe(
  debounceTime(300),
  exhaustMap(([order, current, client, ready]) => {
    if (!client || !ready || !order || !current) {
      return of(null);
    }
    const {amount, direction, marketIndex, margin, marginType} = order;
    const {days, minimumMaintainanceCr} = current;
    if (amount <= 0) {
      return of(null);
    }
    swapLoading$.next(true);
    return calcSwap(client, {
      amount,
      direction,
      marketIndex,
      days,
    } as any);
  }),
  shareReplay()
);

export const calcInfo$ = combineLatest([swap$, order$, current$, lastTrade$]).pipe(
  map(([res, params, contract, lastTrade]: any) => {
    if (!res) {
      return {};
    }
    let lipPrice = '-';
    if (params.marginType === 'ISOLATED') {
      const st = Big(res?.py)
        .times(params.amount || 0)
        .toNumber();
      lipPrice =
        params.amount > 0 && params.margin > 0
          ? calcLiqPrice(
              params.direction as any,
              contract.minimumMaintainanceCr,
              params.amount,
              st,
              params.margin
            )
          : '-';
    }
    const fee = Big(params?.amount || 0)
      .times(0.0005)
      .toFixed(4);
    const trade = lastTrade?.[contract?.symbol];
    const returnData: any = {...(res || {}), lipPrice, fee};
    if (trade?.Yield) {
      returnData.yield = Big(trade.Yield).times(100).toFixed(2) + '%';
    }
    if (res?.impliedSwapRate) {
      returnData.priceImpact = Big(res.impliedSwapRate).times(100).toFixed(2) + '%';
    }
    if (trade?.LastPrice && returnData.py) {
      returnData.impact =
        Big(returnData.py).minus(trade.LastPrice).div(trade.LastPrice).times(100).toFixed(4) + '%';
    }
    return returnData;
  })
);

async function calcSwap(
  client: RateClient,
  params: {
    amount: number;
    direction: 'LONG' | 'SHORT';
    marketIndex: number;
    days: number;
  }
) {
  let res: any = null;
  try {
    const start = Date.now();
    res = await client.simulatePlaceOrder(params);
    console.log('swap time : ', Date.now() - start);
  } catch (e) {}
  swapLoading$.next(false);
  return res;
}
