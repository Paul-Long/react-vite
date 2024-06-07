import {lpApi} from '@rx/api/lp';
import {combineLatest, startWith, Subject, switchMap} from 'rxjs';

export const query$ = new Subject();
const queryApy$ = query$.pipe(startWith(0));

export const apy$ = combineLatest([queryApy$]).pipe(switchMap(() => load()));

async function load() {
  const {data} = await lpApi.queryApy();
  return data ?? [];
}
