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
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {map} from 'rxjs/operators';

export const queryRecentTrades$ = new BehaviorSubject<string>('');
export const clearRecentTrades$ = new Subject();

const state$ = queryRecentTrades$.pipe(
  tap(of([])),
  switchMap((symbol) => load(symbol))
);

const clear$ = clearRecentTrades$.pipe(startWith(false));

const subRecentTrades$ = combineLatest([recentTrades$, clear$]).pipe(
  scan((acc, [d, clear]) => {
    if (clear) {
      setTimeout(() => {
        clearRecentTrades$.next(false);
      }, 0);
      return [];
    }
    const data = (d?.NoMDEntries || [])?.map(formatData);
    return [...acc, ...data];
  }, [])
);

export const recentTradesState$ = combineLatest([state$, subRecentTrades$]).pipe(
  map(([res, sub]) => {
    const data = sub.filter((d) => !res?.some((r) => r.timestamp === d.timestamp));
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
  const time = new Date(d.MDEntryTime).getTime();
  return {
    direction: d.MDEntryType === '1' ? 'LONG' : 'SHORT',
    price: numUtil.trimEnd0(numUtil.floor(d.MDEntryPx, 9)),
    yield: numUtil.trimEnd0(numUtil.floor(d.Yield, 2, -2)) + '%',
    amount: numUtil.trimEnd0(numUtil.floor(d.MDEntrySize, 4)),
    time: timeUtil.formatTime(time),
    datetime: d.MDEntryTime,
    timestamp: time,
  };
}
