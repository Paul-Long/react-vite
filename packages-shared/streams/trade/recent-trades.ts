import {recentTrades$} from '@/subscription/recent-trades';
import {tradeApi} from '@rx/api/trade';
import {numUtil} from '@rx/helper/num';
import {timeUtil} from '@rx/helper/time';
import {
  BehaviorSubject,
  combineLatest,
  of,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {map} from 'rxjs/operators';

export const queryRecentTrades$ = new BehaviorSubject<string>('');

const state$ = queryRecentTrades$.pipe(
  tap(of([])),
  switchMap((symbol) => load(symbol))
);

const subRecentTrades$ = combineLatest([recentTrades$]).pipe(
  scan((acc, [d]) => {
    const data = (d?.NoMDEntries || [])?.map(formatData);
    return [...acc, ...data];
  }, [])
);

export const recentTradesState$ = combineLatest([state$, subRecentTrades$]).pipe(
  map(([res, sub]) => {
    const data = sub.filter((d) => !res?.some((r) => r.datetime === d.datetime));
    return [...res, ...data].sort((a, b) => (a.datetime > b.datetime ? -1 : 1));
  }),
  startWith([]),
  shareReplay()
);

async function load(symbol: string) {
  const {data} = await tradeApi.loadRecentTrades(symbol);
  return (data?.NoMDEntries ?? []).map(formatData);
}

function formatData(d: Record<string, any>) {
  return {
    direction: d.MDEntrySize === '0' ? 'LONG' : 'SHORT',
    price: numUtil.trimEnd0(numUtil.floor(d.MDEntryPx, 6)),
    yield: numUtil.trimEnd0(numUtil.floor(d.Yield, 2, -2)) + '%',
    amount: numUtil.trimEnd0(numUtil.floor(d.MDEntrySize, 4)),
    time: timeUtil.formatTime(new Date(d.MDEntryTime).getTime()),
    datetime: d.MDEntryTime,
  };
}
