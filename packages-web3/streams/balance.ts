import {RateClient} from '@/sdk';
import {clientReady$, rateXClient$} from '@/streams/rate-x-client';
import Big from 'big.js';
import {BehaviorSubject, combineLatest, debounceTime, switchMap} from 'rxjs';

const _balance$ = new BehaviorSubject<number | string>(0);
export const balance$ = _balance$.asObservable();

export const updateBalance$ = new BehaviorSubject(0);

combineLatest([rateXClient$, clientReady$])
  .pipe(
    debounceTime(100),
    switchMap(([client, ready]) => getBalance(client, ready))
  )
  .subscribe(_balance$);

async function getBalance(client: RateClient | null, ready: boolean) {
  if (!client || !ready) {
    return 0;
  }
  const account = await client?.getUserMintAccount(0);
  if (!account) {
    return 0;
  }
  const b = await client?.getTokenAccountBalance(account);
  return Big(b).div(1_000_000_000).toFixed(4);
}
