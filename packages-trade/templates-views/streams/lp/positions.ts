import {symbolMapById$} from '@rx/streams/config';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

export const query$ = new BehaviorSubject(0);
export const marketIndex$ = new BehaviorSubject<number | null>(null);
const loading$ = new BehaviorSubject(false);

const getPositions$ = combineLatest([rateXClient$, clientReady$, marketIndex$, query$]).pipe(
  debounceTime(200),
  switchMap(([client, ready, marketIndex]) => load(client, ready, marketIndex)),
  map((res) => {
    loading$.next(false);
    return res;
  }),
  startWith([])
);

export const positions$ = combineLatest([getPositions$, lastTrade$, symbolMapById$, loading$]).pipe(
  debounceTime(200),
  filter((res) => !res[res.length - 1]),
  switchMap(([positions, trade, symbolMap]: any) => calcPositions(positions)),
  startWith([]),
  shareReplay()
);

async function calcPositions(positions: any[]) {
  return positions?.map((p) => {
    const {marketIndex, userPda} = p;
    const {upperRate, lowerRate} = p.ammPosition || {};
    const key = [userPda, marketIndex, lowerRate, upperRate].join('-');
    return {...p, key};
  });
}

async function load(client: RateClient, ready: boolean, marketIndex: number | null) {
  if (!client || !ready || marketIndex === null) {
    return [];
  }
  loading$.next(true);
  console.log(new Date(), 'LP Position Load : ');
  return await client.getLpPositions(marketIndex);
}
