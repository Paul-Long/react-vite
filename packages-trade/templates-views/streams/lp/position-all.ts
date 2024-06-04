import {symbolMapById$} from '@rx/streams/config';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Big} from 'big.js';
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

const loading$ = new BehaviorSubject(false);

const getPositions$ = combineLatest([rateXClient$, clientReady$, query$]).pipe(
  debounceTime(200),
  switchMap(([client, ready]) => load(client, ready)),
  map((res) => {
    loading$.next(false);
    return res;
  }),
  startWith([])
);

export const positions$ = combineLatest([getPositions$, lastTrade$, symbolMapById$, loading$]).pipe(
  debounceTime(200),
  filter((res) => !res[res.length - 1]),
  switchMap(([positions, trade, symbolMap]: any) => calcPositions(positions, symbolMap)),
  startWith([]),
  shareReplay()
);

positions$.subscribe((data) => {
  console.log('ALL Positions : ', data);
});

async function load(client: RateClient, ready: boolean) {
  if (!client || !ready) {
    return [];
  }
  loading$.next(true);
  console.log(new Date(), 'LP ALL Position Load : ');
  return await client.getAllLpPositions();
}

async function calcPositions(positions: any[], symbolMap: Record<string, any>) {
  return positions?.map((p) => {
    const {marketIndex, userPda} = p;
    const {upperRate, lowerRate} = p.ammPosition || {};
    const key = [userPda, marketIndex, lowerRate, upperRate].join('-');
    const apr = Big(Math.random() * (9.2 - 8.3) + 8.3).toFixed(1);
    return {...p, key, apr, contract: symbolMap[marketIndex]};
  });
}
