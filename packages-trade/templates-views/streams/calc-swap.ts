import {current$} from '@/pages/trade/streams/streams';
import {calcLiqPrice} from '@/streams/utils';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Big} from 'big.js';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  exhaustMap,
  map,
  of,
  shareReplay,
  tap,
} from 'rxjs';

export const order$ = new BehaviorSubject<any>(null);

let timer: any = null;
let resultCache: Record<string, any> = {};
export const swapLoading$ = new BehaviorSubject(false);
export const swap$ = combineLatest([order$, current$, rateXClient$, clientReady$]).pipe(
  debounceTime(400),
  tap(() => of(null)),
  exhaustMap(([order, current, client, ready]) => {
    if (!client || !ready || !order || !current) {
      return of(null);
    }
    const {amount, direction, marketIndex, margin, marginType, currentKey = 'amount'} = order;
    const {days, minimumMaintainanceCr} = current;
    if (currentKey === 'amount' && amount <= 0 && currentKey === 'margin' && margin <= 0) {
      return of(null);
    }
    if (timer) {
      clearTimeout(timer);
    }
    swapLoading$.next(true);
    console.log('swap params : ', {
      amount: currentKey === 'amount' ? amount : margin,
      direction,
      marketIndex,
      input: currentKey,
      days,
    });
    return calcSwap(
      client,
      {
        amount: currentKey === 'amount' ? amount : margin,
        direction,
        marketIndex,
        input: currentKey,
        days,
      } as any,
      order
    );
  }),
  shareReplay()
);

export const calcInfo$ = combineLatest([swap$, current$, lastTrade$]).pipe(
  map(([swapResult, contract, lastTrade]: any) => {
    const {result, order: params} = swapResult || {};
    const keys = [params.currentKey, params.direction, params.marketIndex];
    if (params.currentKey === 'amount') {
      keys.push(params.amount);
    }
    if (params.currentKey === 'margin') {
      keys.push(params.margin);
    }
    if (!result) {
      return {};
    }
    const {
      baseAssetAmount,
      quoteAssetAmount,
      entryPrice,
      sqrtPrice,
      impliedSqrtRate,
      impliedEntryRate,
    } = result;
    let lipPrice = '-';
    if (params.marginType === 'ISOLATED') {
      const st = Big(entryPrice)
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
    console.log('order : ', params);
    const fee = Big(!params.margin ? 0 : params.margin)
      .times(params.leverage)
      .times(0.001)
      .toFixed(9);

    const trade = lastTrade?.[contract?.symbol];
    const returnData: any = {...(result || {}), lipPrice, fee};
    if (trade?.Yield) {
      returnData.yield = Big(trade.Yield).times(100).toFixed(2) + '%';
    }
    if (!!impliedEntryRate) {
      returnData.priceImpact = Big(impliedEntryRate).times(100).toFixed(2, 0) + '%';
    }
    if (trade?.LastPrice && !!sqrtPrice) {
      returnData.impact =
        Big(sqrtPrice).minus(trade.LastPrice).div(trade.LastPrice).times(100).toFixed(4) + '%';
    }
    if (params.currentKey === 'amount' && params.amount && Big(baseAssetAmount).lt(params.amount)) {
      returnData.maxAmount = baseAssetAmount;
    }
    if (
      params.currentKey === 'margin' &&
      params.margin &&
      Big(quoteAssetAmount).lt(params.margin)
    ) {
      returnData.maxMargin = quoteAssetAmount;
    }
    timer = setTimeout(() => {
      swapLoading$.next(false);
      timer = null;
    }, 100);
    resultCache[keys.join('_')] = returnData;
    return returnData;
  })
);

async function calcSwap(
  client: RateClient,
  params: {
    amount: number;
    direction: 'LONG' | 'SHORT';
    marketIndex: number;
    input: 'amount' | 'margin';
    days: number;
  },
  order: any
) {
  let res: any = null;
  try {
    const start = Date.now();
    res = await client.simulatePlaceOrder(params);
    console.log('swap time : ', Date.now() - start);
  } catch (e) {}
  return {result: res, order};
}
