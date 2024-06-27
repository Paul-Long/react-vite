import {RateClient} from '@/sdk';
import {getMarginIndexByMarketIndexV2} from '@/sdk/utils';
import {clientReady$, rateXClient$} from '@/streams/rate-x-client';
import {Subject, combineLatest, debounceTime, shareReplay, startWith, switchMap} from 'rxjs';

export const updateBalance$ = new Subject();

export const marketToMargin = (marketIndex: number) => getMarginIndexByMarketIndexV2(marketIndex);
export const balance$ = combineLatest([
  rateXClient$,
  clientReady$,
  updateBalance$.pipe(startWith(0)),
]).pipe(
  debounceTime(100),
  switchMap(([client, ready]) => getBalance(client, ready)),
  startWith({0: 0, 1: 0, 2: 0}),
  shareReplay()
);

async function getBalance(client: RateClient | null, ready: boolean) {
  if (!client || !ready) {
    return {0: 0, 1: 0, 2: 0};
  }
  return client?.getTokenAccountBalance();
}
