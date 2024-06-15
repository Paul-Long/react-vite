import {epochApi} from '@rx/api/epoch';
import {BehaviorSubject, Subject, switchMap} from 'rxjs';
import {ratePrice$} from './subscription/rate-price';

const _priceMap$ = new BehaviorSubject({});
export const priceMap$ = _priceMap$.asObservable();

export const queryRate$ = new Subject();
queryRate$.pipe(switchMap(() => loadPrice())).subscribe();

ratePrice$.subscribe((data) => {
  if (data?.length > 0) {
    _priceMap$.next(
      data.reduce((m, d) => {
        return {...m, [d.symbolCategory]: d};
      }, {})
    );
  }
});

export async function loadPrice() {
  const {data} = await epochApi.ratePrice();
  if (data) {
    _priceMap$.next(
      data.reduce((m, d) => {
        return {...m, [d.symbolCategory]: d};
      }, {})
    );
  }
  return {};
}
