import {kline$ as wsKline$} from '@/subscription/kline';
import {formatKlineRow} from '@/utils/format-kline';
import {klineApi} from '@rx/api/kline';
import {BehaviorSubject, Subject, combineLatest, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

const _kLine$ = new BehaviorSubject([]);
export const kLine$ = _kLine$.asObservable();
export const queryKLine$ = new Subject();

const klineState$ = queryKLine$.pipe(switchMap(() => load()));

combineLatest([klineState$, wsKline$])
  .pipe(map(([a, b]) => mergeData(a, b)))
  .subscribe(_kLine$);

async function load() {
  const {data} = await klineApi.queryKLine();
  return data
    ?.map(formatKlineRow)
    .filter(Boolean)
    .sort((a, b) => (a.closeTime > b.closeTime ? 1 : -1));
}

function mergeData(reqList: any, wsList: any) {
  let newList = [...(reqList || [])];
  const last = newList?.[newList?.length - 1];
  if (!!last) {
    wsList = [...(wsList || [])].filter((o) => o.closeTime > last.closeTime);
  }
  console.log('Kline : ', newList, wsList);
  return [...newList, ...(wsList || [])];
}
