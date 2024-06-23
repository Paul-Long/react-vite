import {symbolMapById$} from '@rx/streams/config';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Big} from 'big.js';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

export const query$ = new BehaviorSubject(0);
export const marketIndex$ = new BehaviorSubject<number | null>(null);
export const loading$ = new BehaviorSubject(false);

const getPositions$ = combineLatest([
  rateXClient$,
  clientReady$,
  marketIndex$,
  symbolMapById$,
  query$,
]).pipe(
  debounceTime(200),
  switchMap(([client, ready, marketIndex, symbolMap]) =>
    load(client, ready, marketIndex, symbolMap)
  ),
  map((res) => {
    loading$.next(false);
    return res;
  }),
  startWith([])
);

export const positions$ = combineLatest([getPositions$, loading$]).pipe(
  debounceTime(200),
  tap(() => of([])),
  filter((res) => !res[res.length - 1]),
  switchMap(([positions]: any) => calcPositions(positions)),
  startWith([]),
  shareReplay()
);

export async function calcPositions(positions: any[]) {
  return positions?.map((p) => {
    const {marketIndex, userPda} = p;
    const {upperRate, lowerRate} = p.ammPosition || {};
    const key = [userPda, marketIndex, lowerRate, upperRate].join('-');
    const apr = Big(Math.random() * (9.2 - 8.3) + 8.3).toFixed(1);
    return {...p, key, apr};
  });
}

async function load(
  client: RateClient,
  ready: boolean,
  marketIndex: number | null,
  symbolMap: Record<string, any>
) {
  if (!client || !ready || marketIndex === null) {
    return [];
  }
  const symbol = symbolMap?.[marketIndex];
  if (!symbol) {
    return [];
  }
  loading$.next(true);
  console.log(new Date(), 'LP Position Load : ');
  const positions = await client.getLpPositions(marketIndex, {[marketIndex]: symbol.seconds});
  return positions.map((pos) => ({...(symbol || {}), ...pos}));
}
