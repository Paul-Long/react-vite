import {lastTradeSnapshot$} from '@/subscription/last-trade-snapshot';
import {tradeApi} from '@rx/api/trade';
import {BehaviorSubject, Subject, combineLatest, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

const _lastTrade$ = new BehaviorSubject({});
export const lastTrade$ = _lastTrade$.asObservable();
export const queryLastTrade$ = new Subject();

const lastTradeState$ = queryLastTrade$.pipe(switchMap(() => load()));

combineLatest([lastTradeState$, lastTradeSnapshot$])
  .pipe(map(([req, ws]) => mergeData(req, ws)))
  .subscribe(_lastTrade$);

async function load() {
  const {data} = await tradeApi.lastTradeSnapshot();
  return data?.reduce((obj, d) => ({...obj, [d.SecurityID]: d}), {});
}

function mergeData(reqData: Record<string, any>, wsData: Record<string, any>) {
  let data = {...reqData};
  if (!!wsData?.SecurityID) {
    data[wsData?.SecurityID] = {...wsData};
    reqData[wsData?.SecurityID] = {...wsData};
  }
  return data;
}
