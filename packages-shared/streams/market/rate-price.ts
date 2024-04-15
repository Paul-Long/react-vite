import {markPrice$} from '@/subscription/mark-price';
import {marketApi} from '@rx/api/market';
import {BehaviorSubject, Subject, combineLatest, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

const _ratePriceMap$ = new BehaviorSubject({});
export const ratePriceMap$ = _ratePriceMap$.asObservable();

export const queryRatePrice$ = new Subject();
const ratePriceState$ = queryRatePrice$.pipe(switchMap(() => load()));

combineLatest([ratePriceState$, markPrice$])
  .pipe(map(([state, price]) => mergeData(state, price)))
  .subscribe(_ratePriceMap$);

async function load() {
  const {data} = await marketApi.ratePrice();
  return data ?? {};
}

function mergeData(state: Record<string, any>, price: Record<string, any>) {
  if (!price?.SecuuurityID) {
    return state;
  }
  return {...state, [price.SecurityID]: price.IndexPrice};
}
