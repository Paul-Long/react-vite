import {ClosePosition} from '@/pages/trade/positions/ClosePosition';
import {positions$, query$} from '@/streams/positions';
import {DownIcon} from '@rx/components/icons/DownIcon';
import {env} from '@rx/env';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {depositModal$} from '@rx/streams/wallet';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import type {Column} from '@rx/widgets/table/types';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useCallback, useEffect, useState} from 'react';

export function usePositions(mode: string) {
  const {LG} = useLang();
  const [client] = useStream(rateXClient$);
  const [columns, setColumns] = useState<Column[]>([]);
  const dataSource = useObservable(positions$, []);

  useEffect(() => {
    query$.next(0);
  }, []);

  useEffect(() => {
    const columns: Column[] = [
      {
        title: LG(clang.No) + '.',
        dataIndex: 'id',
        fixed: env.isMobile ? false : 'left',
        width: env.isMobile ? 'auto' : '60px',
        shadowRight: true,
        headerCellStyle: {background: '#030B0F'},
        bodyCellStyle: {background: '#030B0F'},
        render: (_, i) => (i ?? 0) + 1,
      },
      {
        title: LG(lang.MarginType),
        dataIndex: 'marginType',
        render: (record) => (record.isIsolated ? LG(lang.Isolated) : LG(lang.Cross)),
      },
      {
        title: LG(clang.Contract),
        align: 'left',
        dataIndex: 'contract',
        render: renderContract(LG),
      },
      {title: 'YT/ST', dataIndex: 'ytst', align: 'right', render: renderYtSt(LG)},
      {title: LG(clang.PnL), dataIndex: 'pnl', align: 'right', render: renderPNL(LG)},
      {
        title: [LG(clang.Entry), LG(clang.Current)].join('/'),
        dataIndex: 'entry',
        align: 'right',
        render: renderEntry,
      },
      {
        title: LG(clang.CR) + '/' + LG(clang.Liq) + '.' + LG(clang.Price),
        dataIndex: 'liq',
        align: 'right',
        render: renderCrLip,
      },
      {
        title: LG(clang.Margin),
        dataIndex: 'margin',
        align: 'right',
        render: renderMargin(handleDeposit),
      },
      {
        title: '-',
        dataIndex: 'action',
        render: renderAction,
        fixed: 'right',
        align: 'right',
        shadowLeft: true,
        shadowRight: false,
        headerCellStyle: {background: '#030B0F'},
        bodyCellStyle: {background: '#030B0F'},
      },
    ];
    setColumns(columns);
  }, [LG, mode, client]);

  const handleDeposit = async (row: any) => {
    depositModal$.next({visible: true, userPda: row.userPda, marketIndex: row.marketIndex});
  };

  const renderAction = useCallback(
    (row: any) => {
      return (
        <div className="df fdr aic gap8px">
          <ClosePosition row={row} client={client} />
        </div>
      );
    },
    [client]
  );

  useEffect(() => {
    console.log('My Positions : ', dataSource);
  }, [dataSource]);

  return {columns, dataSource};
}

function renderContract(LG: any) {
  return (row: any) => (
    <div className="flex flex-col">
      <span>{row.symbolName ?? ''}</span>
      <span className="text-green-500">
        {row.baseAssetAmount > 0 ? LG(clang.Long) : LG(clang.Short)}
      </span>
    </div>
  );
}

function renderYtSt(LG: any) {
  return (row: any) => (
    <div className="flex flex-col items-end w-full">
      <span>{row.baseAssetAmount ?? '-'} YT</span>
      <span>{row.quoteAssetAmount ?? '-'} ST</span>
    </div>
  );
}

function renderPNL(LG: any) {
  return (row: any) => (
    <div className="flex flex-col items-end w-full">
      <div className={clsx([row.pnl > 0 && 'text-green-500'], [row.pnl < 0 && 'text-red-500'])}>
        {row?.pnl}
      </div>
    </div>
  );
}

function renderCrLip(row: any) {
  return (
    <div className="flex flex-col items-end w-full">
      <span>{!!row.cr ? Big(row.cr).times(100).toFixed(2) + '%' : '-'}</span>
      <span>{row.lipPrice}</span>
    </div>
  );
}

function renderEntry(row: any) {
  return (
    <div className="flex flex-col items-end w-full">
      <span>{row.entry ?? '-'}</span>
      <span>{row.LastPrice ?? '-'}</span>
    </div>
  );
}

function renderMargin(handleDeposit: (r: any) => void) {
  return (row: any) => (
    <div className="flex flex-row justify-right gap-8px">
      {numUtil.floor(row?.margin ?? 0, 4)} SOL
      <div className="flex flex-row gap-4px">
        <div
          className="flex justify-center items-center bg-green-500 rounded-4px w-24px h-24px"
          onClick={() => handleDeposit(row)}
        >
          <DownIcon />
        </div>
        <div className="flex justify-center items-center bg-gray-80 rounded-4px w-24px h-24px rotate-180">
          <DownIcon color="white" />
        </div>
      </div>
    </div>
  );
}
