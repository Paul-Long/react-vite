import {kline$ as wsKline$} from '@/subscription/kline';
import {formatKlineRow} from '@/utils/format-kline';
import {klineApi} from '@rx/api/kline';
import dayjs from 'dayjs';
import {BehaviorSubject, Subject, combineLatest, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

const _kLine$ = new BehaviorSubject([]);
export const kLine$ = _kLine$.asObservable();
export const queryKLine$ = new Subject();
export const clear$ = new Subject();

const klineState$ = queryKLine$.pipe(
  switchMap((query: any) => {
    _kLine$.next([]);
    return load(query);
  })
);

clear$.subscribe(() => {
  _kLine$.next([]);
  wsKline$.clear();
});

combineLatest([klineState$, wsKline$])
  .pipe(map(([a, b]) => mergeData(a, b)))
  .subscribe(_kLine$);

async function load(query: any) {
  const {data} = await klineApi.queryKLine(query);
  return data
    ?.map(formatKlineRow)
    .filter(Boolean)
    .sort((a, b) => (a.closeTime > b.closeTime ? 1 : -1));
}

function mergeData(reqList: any, wsList: any) {
  let newList = [...(reqList || [])];
  newList = newList.filter((n) => !wsList.some((w) => w.timeFormat === n?.timeFormat));
  return [...newList, ...(wsList || [])].map(({closeTime, ...d}) => ({
    ...d,
    time: dayjs(closeTime).valueOf() / 1000,
  }));
}
