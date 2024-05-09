import {RateClient} from '@rx/web3/sdk';
import {rateXClient$} from '@rx/web3/streams/rate-x-client.ts';
import {
  BehaviorSubject,
  combineLatest,
  shareReplay,
  startWith,
  switchMap,
  throttleTime,
} from 'rxjs';

export const queryTwap$ = new BehaviorSubject(-1);

export const twap$ = combineLatest([rateXClient$, queryTwap$]).pipe(
  throttleTime(100),
  switchMap(([client]) => getTwap(client)),
  startWith(0),
  shareReplay()
);

async function getTwap(client: RateClient) {
  if (!client) {
    return {9: 0, 10: 0};
  }

  return {
    9: await client.getAmmTwap({marketIndex: 9}),
    10: await client.getAmmTwap({marketIndex: 10}),
  };
}
