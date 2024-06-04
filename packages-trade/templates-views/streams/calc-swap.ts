import {current$} from '@/pages/trade/streams/streams';
import {calcLiqPrice} from '@/streams/utils';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Big} from 'big.js';
import {BehaviorSubject, combineLatest, exhaustMap, map, of, shareReplay, throttleTime} from 'rxjs';

export const order$ = new BehaviorSubject<any>(null);

let timer: any = null;
export const swapLoading$ = new BehaviorSubject(false);
export const swap$ = combineLatest([order$, current$, rateXClient$, clientReady$]).pipe(
  throttleTime(300),
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
    return calcSwap(client, {
      amount: currentKey === 'amount' ? amount : margin,
      direction,
      marketIndex,
      input: currentKey,
      days,
    } as any);
  }),
  shareReplay()
);

export const calcInfo$ = combineLatest([swap$, order$, current$, lastTrade$]).pipe(
  map(([result, params, contract, lastTrade]: any) => {
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
    if (params.currentKey === 'amount' && params.amount) {
      returnData.maxAmount = Big(baseAssetAmount).lt(params.amount)
        ? baseAssetAmount
        : params.amount;
    }
    if (params.currentKey === 'margin' && params.margin) {
      returnData.maxMargin = Big(quoteAssetAmount).lt(params.margin)
        ? quoteAssetAmount
        : params.margin;
    }
    timer = setTimeout(() => {
      swapLoading$.next(false);
      timer = null;
    }, 100);
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
  }
) {
  let res: any = null;
  try {
    const start = Date.now();
    res = await client.simulatePlaceOrder(params);
    console.log('swap time : ', Date.now() - start);
  } catch (e) {}
  return res;
}
