import {AssetList} from '@/components/AssetList';
import {IMAGES} from '@/pages/lp/const';
import {Detail} from '@/views/trade/market/Detail';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/dashboard.lang';
import {contracts$} from '@rx/streams/config';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {lastTrade$, queryLastTrade$} from '@rx/streams/trade/last-trade';
import {Button} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components';

const Contents = styled.div`
  cursor: pointer;
  &:hover .td {
    background: #ffffff14 !important;
    backdrop-filter: blur(200px);
  }
`;

const headerRow = 'bg-gray-40 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-40';

export default function () {
  const {LG} = useLang();
  const [contract, setContract] = useState('ALL');
  const {detail, dataSource, handleSelect, gotoTrade} = useDataSource();

  const dataList = useMemo(() => {
    if (!contract || contract === 'ALL') {
      return dataSource;
    }
    return dataSource?.filter((data: ConfigSymbol) => data.symbolLevel2Category === contract);
  }, [dataSource, contract]);

  useEffect(() => {
    queryLastTrade$.next(0);
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
  }, []);

  if (detail) {
    return <Detail data={detail} onBack={() => handleSelect(null)()}></Detail>;
  }

  return (
    <div
      className={clsx(
        'flex flex-col w-1200px max-w-screen mx-auto mt-40px',
        'border-1px border-solid border-#2C2D2D'
      )}
    >
      <div className="flex flex-col px-20px pt-20px pb-10px border-b-1px border-b-solid border-b-#2C2D2D">
        <AssetList onContract={(con: string) => setContract(con)} />
      </div>
      <div className="w-full grid grid-cols-6 gap-y-12px text-gray-500">
        <div className="contents bg-gray-40 text-gray-60">
          <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(lang.Contract)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ExpireIn)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ImpliedYield)}</div>
          <div className={clsx(headerRow)}>{LG(lang.YTPrice)}</div>
          <div className={clsx(headerRow)}>{LG(lang.H24PriceChg)}</div>
          <div className={clsx(headerRow)}>{LG(lang.Action)}</div>
        </div>
        {dataList?.map((d) => (
          <Contents key={d.symbol} className="contents" onClick={handleSelect(d)}>
            <div className={clsx(bodyRow, 'gap-8px py-12px pl-10px sm:pl-20px')}>
              <img
                src={IMAGES[d.symbolLevel2Category.toUpperCase()]}
                alt={d.symbol}
                width={24}
                height={24}
              />
              {d?.symbol}
            </div>
            <div className={clsx(bodyRow)}>{[d.ttm, d.unit].join(' ')}</div>
            <div className={clsx(bodyRow, 'text-lime-500')}>{d.impliedYield}</div>
            <div className={clsx(bodyRow)}>{d.LastPrice ?? '-'}</div>
            <div
              className={clsx(
                bodyRow,
                [d.change24 !== '-' && d.change24 > 0 && 'text-lime-500'],
                [d.change24 !== '-' && d.change24 < 0 && 'text-red-500']
              )}
            >
              {d.change24}%
            </div>
            <div className={clsx(bodyRow)}>
              <Button size="sm" type="default" onClick={gotoTrade(d)}>
                {LG(lang.Trade)}
              </Button>
            </div>
          </Contents>
        ))}
      </div>
    </div>
  );
}

function useDataSource() {
  const lastTrade: any = useObservable(lastTrade$, {});
  const contracts = useObservable(contracts$, []);
  const {fixLink} = useFixLink();
  const [detail, setDetail] = useState<Record<string, any> | null>(null);

  const dataSource = useMemo(() => {
    return contracts?.map((con) => {
      const last = lastTrade?.[con.symbol] || {};
      const impliedYield = !!last?.Yield ? Number(last?.Yield * 100).toFixed(3) + '%' : '-';
      const change24 =
        !last?.PreClosePrice || !last?.LastPrice
          ? '-'
          : Big(last.PreClosePrice)
              .minus(last.LastPrice)
              .div(last.PreClosePrice)
              .times(100)
              .round(2)
              .toNumber();
      return {...con, ...(last ?? {}), impliedYield, change24};
    });
  }, [contracts, lastTrade]);

  const handleSelect = useCallback(
    (data: Record<string, any> | null) => () => {
      setDetail(data);
    },
    []
  );

  const gotoTrade = useCallback(
    (row: Record<string, any>) => (event: React.MouseEvent) => {
      event.stopPropagation();
      window.location.assign(fixLink('/trade') + '/' + row.symbol);
    },
    [detail]
  );

  return {detail, dataSource, handleSelect, gotoTrade};
}
