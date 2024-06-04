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
  timer,
} from 'rxjs';
import {calcAssetLiability} from '../positions';

const source = timer(0, 60 * 1000);

export const waiverQuery$ = new BehaviorSubject(0);
const loading$ = new BehaviorSubject(false);

const getPositions$ = combineLatest([rateXClient$, clientReady$, waiverQuery$, source]).pipe(
  debounceTime(200),
  switchMap(([client, ready]) => load(client, ready)),
  map((res) => {
    loading$.next(false);
    return res;
  }),
  startWith([])
);

export const crossMargin$ = combineLatest([
  getPositions$,
  lastTrade$,
  symbolMapById$,
  loading$,
]).pipe(
  debounceTime(200),
  filter((res) => !res[res.length - 1]),
  switchMap(([positions, trade, symbolMap, loading]: any) =>
    calcPositions(positions, trade, symbolMap)
  ),
  startWith({remainMargin: '0'}),
  shareReplay()
);

async function load(client: RateClient, ready: boolean) {
  if (!client || !ready) {
    return [];
  }
  loading$.next(true);
  console.log(new Date(), 'Position Load : ', client.wallet);
  return await client.getCrossPositions();
}

async function calcPositions(
  positions: any[],
  tradeMap: any,
  symbolMap: Record<number, ConfigSymbol>
): Promise<{remainMargin: string}> {
  const {assets, liability, margin} = calcAssetLiability(positions, tradeMap, symbolMap);
  const requireMargin = Big(1.1).times(liability).minus(assets).abs();
  const remainMargin = margin.minus(requireMargin);
  return {
    remainMargin: remainMargin.lt(0) ? '0' : remainMargin.round(6, 0).toString(),
  };
}
