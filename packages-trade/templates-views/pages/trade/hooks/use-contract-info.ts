import {useObservable} from '@rx/hooks/use-observable.ts';
import {ttmMap$} from '@rx/streams/epoch.ts';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot.ts';
import {lastTrade$} from '@rx/streams/trade/last-trade.ts';
import {useEffect, useMemo} from 'react';
import {useContract} from './use-contract.ts';

export function useContractInfo() {
  const lastTrade = useObservable<any>(lastTrade$, {});
  const ttmMap = useObservable<Record<string, any>>(ttmMap$, {});
  const {asset, contract, maturity} = useContract();

  const SecurityID = useMemo(() => [contract, maturity].join('-'), [contract, maturity]);
  const ttm = useMemo(
    () => ttmMap?.[[asset, contract, maturity].join('_')],
    [ttmMap, asset, contract, maturity]
  );
  const data = useMemo(() => {
    const trade = lastTrade?.[SecurityID] ?? {};
    return {...trade, ttm: ttm ? `${ttm.ttm} ${ttm.unit}` : '-'};
  }, [lastTrade, SecurityID, ttm]);

  useEffect(() => {
    if (contract && maturity) {
      lastTradeSnapshot$.next('dc.md.trade.' + [contract, maturity].join('-'));
    }
  }, [contract, maturity]);

  return {data, ttm};
}
