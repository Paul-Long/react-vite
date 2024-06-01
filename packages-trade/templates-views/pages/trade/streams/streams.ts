import {contracts$} from '@rx/streams/config';
import {ttmMap$} from '@rx/streams/epoch';
import {BehaviorSubject, Subject, combineLatest, map, shareReplay} from 'rxjs';

export const asset$ = new BehaviorSubject<string>('SOL');
export const contract$ = new BehaviorSubject<string | null>(null);
export const maturity$ = new BehaviorSubject<string | null>(null);
export const time$ = new BehaviorSubject<string>('5M');
export const chartType$ = new BehaviorSubject<'price' | 'yield'>('price');
export const resize$ = new Subject();
export const openRecent$ = new BehaviorSubject<boolean>(false);

export const current$ = combineLatest([asset$, contract$, maturity$, contracts$, ttmMap$]).pipe(
  map(([asset, contract, term, contracts, ttmMap]: any) => {
    if (!asset || !contract || !term || !contracts || !ttmMap) {
      return null;
    }
    const key = [asset, contract, term].join('_');
    const ttm = ttmMap?.[key];
    const current = contracts.find(
      (c: any) => c.symbolLevel2Category === contract && c.term === term
    );
    return {...(current || {}), ...(ttm || {}), marketIndex: current?.id};
  }),
  shareReplay()
);
