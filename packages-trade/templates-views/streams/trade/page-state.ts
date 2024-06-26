import {contracts$} from '@rx/streams/config';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {BehaviorSubject, combineLatest, map, shareReplay} from 'rxjs';

export const asset$ = new BehaviorSubject('SOL');

export const contract$ = new BehaviorSubject<string | null>(null);

export const maturity$ = new BehaviorSubject<string | null>(null);

export const positionPage$ = new BehaviorSubject<'Position' | 'Orders' | 'History'>('Position');
export const positionMarginType$ = new BehaviorSubject<'CROSS' | 'ISOLATED'>('CROSS');

export const current$ = combineLatest([contracts$, contract$, maturity$, lastTrade$]).pipe(
  map(([contracts, contract, maturity, lastTrade]) => {
    const data = contracts.find(
      (con) => con.symbolLevel2Category === contract && con.term === maturity
    );
    if (!data) {
      return data;
    }
    const trade = lastTrade?.[data.symbol];
    return {...data, ...(trade || {})};
  }),
  shareReplay()
);
