import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {BehaviorSubject, combineLatest, debounceTime, shareReplay, switchMap, tap} from 'rxjs';

export const removeQuery$ = new BehaviorSubject<any>({});
export const removeInfo$ = combineLatest([rateXClient$, removeQuery$, clientReady$]).pipe(
  debounceTime(300),
  tap(() => null),
  switchMap(([client, params]) => query(client, params)),
  shareReplay()
);

async function query(client: RateClient, params: any) {
  if (!params.rmLiquidityPercent) {
    return null;
  }
  return await client.removePerpLpSharesView(params);
}

export const removeAllQuery$ = new BehaviorSubject<any>({});

export const removeAll$ = combineLatest([rateXClient$, removeAllQuery$, clientReady$]).pipe(
  debounceTime(200),
  tap(() => null),
  switchMap(([client, params]) => query(client, params)),
  shareReplay()
);
