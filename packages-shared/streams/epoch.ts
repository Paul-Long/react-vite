import {contracts$} from '@/config';
import {epochApi} from '@rx/api/epoch';
import {numUtil} from '@rx/helper/num';
import {Big} from 'big.js';
import {BehaviorSubject, combineLatest, filter, shareReplay} from 'rxjs';
import {map} from 'rxjs/operators';

const _epochStartTime$ = new BehaviorSubject(0);
export const epochStartTime$ = _epochStartTime$.asObservable();

export const ttmMap$ = combineLatest([epochStartTime$, contracts$]).pipe(
  filter(([t]) => t > 0),
  map(([time, contracts]) => calcTTM(time, contracts)),
  shareReplay()
);

ttmMap$.subscribe((ttm) => console.log('TTM : ', ttm));

export async function loadEpochStartTime() {
  const {data} = await epochApi.startTime();
  console.log('Epoch Start Time : ', data.ttm);
  if (data) {
    _epochStartTime$.next(data.ttm);
  }
}

function calcTTM(time: number, contracts: ConfigSymbol[]) {
  return contracts.reduce((ttm, c) => {
    const {symbolLevel1Category, symbolLevel2Category, term, dueDate} = c;
    const key = [symbolLevel1Category, symbolLevel2Category, term].join('_');
    const due = new Date(dueDate);

    const maturity = Date.UTC(
      due.getFullYear(),
      due.getMonth(),
      due.getDate(),
      due.getHours(),
      due.getMinutes(),
      due.getSeconds()
    );

    const days = Big(maturity)
      .minus(time)
      .div(60 * 60 * 24 * 1000);
    if (days.gt(Big(365))) {
      ttm[key] = {ttm: numUtil.trimEnd0(days.div(365).toFixed(2)), unit: 'years', days: days.toNumber()};
    } else {
      ttm[key] = {ttm: numUtil.trimEnd0(days.toFixed(2)), unit: 'days', days: days.toNumber()};
    }
    return ttm;
  }, {});
}
