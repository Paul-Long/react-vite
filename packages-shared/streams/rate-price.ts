import {marketApi} from '@rx/api/market';
import {BehaviorSubject} from 'rxjs';

const _priceMap$ = new BehaviorSubject({});
export const priceMap$ = _priceMap$.asObservable();

export async function loadPrice() {
  const {data} = await marketApi.ratePrice();
  if (data) {
    _priceMap$.next(data);
  }
}
