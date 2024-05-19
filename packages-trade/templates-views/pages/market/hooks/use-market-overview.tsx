import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/dashboard.lang';
import {maturityMap$} from '@rx/streams/config';
import {ttmMap$} from '@rx/streams/epoch';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback, useMemo} from 'react';

export function useMarketOverview() {
  const {LG} = useLang();
  const maturityMap = useObservable(maturityMap$, {});
  const lastTrade: any = useObservable(lastTrade$, {});
  const ttmMap: any = useObservable(ttmMap$, {});

  const dataSource = useMemo(() => {
    return Object.values(maturityMap)
      .reduce((arr, m) => [...arr, ...m], [])
      .map((m) => {
        const key = [m.symbolLevel1Category, m.symbolLevel2Category, m.term].join('_');
        const ttm = ttmMap?.[key];
        const last = lastTrade?.[m.symbol] || {};
        const impliedYield = !!last?.Yield ? Number(last?.Yield * 100).toFixed(3) + '%' : '-';
        return {
          ...m,
          ...(lastTrade?.[m.symbol] ?? {}),
          ttm: ttm.ttm + ' ' + ttm.unit,
          impliedYield,
        };
      })
      .sort((a, b) => (a.sort - b.sort > 0 ? 1 : -1));
  }, [lastTrade, maturityMap, ttmMap]);

  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {title: LG(lang.Contract), dataIndex: 'SecurityID', align: 'left'},
      {
        title: LG(lang.TermToMaturity),
        dataIndex: 'ttm',
        align: 'right',
      },
      {
        title: LG(lang.ImpliedYield),
        dataIndex: 'Yield',
        align: 'center',
        render: (record) => (!!record?.Yield ? Number(record.Yield * 100).toFixed(3) + '%' : '-'),
      },
      {title: LG(lang.YTPrice), dataIndex: 'LastPrice', align: 'center'},
      {
        title: LG(lang.H24PriceChg),
        dataIndex: 'priceChg',
        align: 'center',
      },
      {
        title: <span></span>,
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        shadowLeft: true,
        render: renderAction,
      },
    ];
    return columns;
  }, []);

  console.log(dataSource);

  function renderAction() {
    return (
      <div className="flex flex-row gap-8px">
        <Button type="primary">{LG(lang.Trade)}</Button>
        <Button type="default">{LG(lang.Earn)}</Button>
      </div>
    );
  }
  return {genColumns, dataSource};
}
