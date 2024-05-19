import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

export const marketIndex$ = new BehaviorSubject(-1);

export const twap$ = combineLatest([rateXClient$, clientReady$, marketIndex$]).pipe(
  debounceTime(100),
  switchMap(([client, ready, marketIndex]) => getTwap(client, ready, marketIndex)),
  startWith(0),
  shareReplay()
);

async function getTwap(client: RateClient, ready: boolean, marketIndex: number) {
  if (!client || !ready || marketIndex === undefined || marketIndex < 0) {
    return {};
  }

  const twap = await client.getAmmTwap({marketIndex});
  console.log('twap : ', twap);
  return {[marketIndex]: twap};
}
