import {RateClient} from '@/sdk';
import {clientReady$, rateXClient$} from '@/streams/rate-x-client';
import Big from 'big.js';
import {BehaviorSubject, Subject, combineLatest, debounceTime, startWith, switchMap} from 'rxjs';

const _balance$ = new BehaviorSubject<number | string>(0);
export const balance$ = _balance$.asObservable();
export const marketIndex$ = new BehaviorSubject<number | null>(null);
export const updateBalance$ = new Subject();

combineLatest([rateXClient$, clientReady$, marketIndex$, updateBalance$.pipe(startWith(0))])
  .pipe(
    debounceTime(100),
    switchMap(([client, ready, marketIndex]) => getBalance(client, ready, marketIndex))
  )
  .subscribe(_balance$);

async function getBalance(client: RateClient | null, ready: boolean, marketIndex: number | null) {
  if (!client || !ready || marketIndex === null) {
    return 0;
  }
  const account =
    marketIndex >= 0
      ? await client?.getUserMintAccountByMarketIndex(marketIndex)
      : await client?.getUserMintAccount(0);
  if (!account) {
    return 0;
  }
  const b = await client?.getTokenAccountBalance(account);
  return Big(b).div(1_000_000_000).round(4, 0).toNumber();
}
