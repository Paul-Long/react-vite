import {contracts$, symbolMapById$} from '@rx/streams/config';
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

const getPositions$ = combineLatest([rateXClient$, clientReady$, contracts$, query$]).pipe(
  debounceTime(200),
  switchMap(([client, ready, contracts]) => load(client, ready, contracts)),
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

async function load(client: RateClient, ready: boolean, contracts: ConfigSymbol[]) {
  if (!client || !ready || !contracts || contracts.length <= 0) {
    return [];
  }
  const ttmMap = contracts.reduce((obj, c: any) => ({...obj, [c.id]: c.seconds}), {});
  loading$.next(true);
  console.log(new Date(), 'LP ALL Position Load : ');
  return await client.getAllLpPositions(ttmMap);
}

async function calcPositions(positions: any[], symbolMap: Record<string, any>) {
  return positions
    ?.filter((p) => !!symbolMap[p.marketIndex])
    ?.map((p) => {
      const {marketIndex, userPda} = p;
      const {upperRate, lowerRate} = p.ammPosition || {};
      const key = [userPda, marketIndex, lowerRate, upperRate].join('-');
      const apr = Big(Math.random() * (9.2 - 8.3) + 8.3).toFixed(1);
      return {...p, key, apr, ...symbolMap[marketIndex]};
    });
}
