import {ClosePosition} from '@/pages/trade/positions/ClosePosition';
import {positions$, query$} from '@/streams/positions';
import {waiverQuery$} from '@/streams/trade/cross-margin';
import {DownIcon} from '@rx/components/icons/DownIcon';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {depositModal$, withdrawModal$} from '@rx/streams/wallet';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Tooltip} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useEffect, useMemo, useState} from 'react';

export function usePositions(marginType: 'CROSS' | 'ISOLATED') {
  const {LG} = useLang();
  const [client] = useStream(rateXClient$);
  const [columns, setColumns] = useState<Column[]>([]);
  const postions = useObservable(positions$, []);

  const dataSource = useMemo(() => {
    const pos = postions.filter((p) => p.marginType === marginType);
    if (marginType === 'CROSS' && pos?.length > 0) {
      return [
        {parent: true, asset: 'SOL', cr: pos[0].cr, margin: pos[0].margin, userPda: pos[0].userPda},
        ...pos.filter((p) => p.baseAssetAmount != 0),
      ];
    }
    return pos;
  }, [postions, marginType]);

  useEffect(() => {
    query$.next(0);
  }, []);

  useEffect(() => {
    const columns: Column[] = [
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
        render: renderCrLip(marginType),
      },
      {
        title: LG(clang.Margin),
        dataIndex: 'margin',
        align: 'right',
        render: renderMargin(handleDeposit, client),
      },
    ];
    if (marginType === 'CROSS') {
      columns.unshift({
        title: LG(clang.MarginAsset),
        align: 'left',
        dataIndex: 'asset',
        render: (row: any) => (row.parent ? row.asset : ''),
      });
    }
    setColumns(columns);
  }, [LG, client, marginType]);

  const handleDeposit = async (row: any) => {
    depositModal$.next({
      visible: true,
      userPda: row.userPda,
      marginIndex: 0,
      onFinish: () => {
        waiverQuery$.next(0);
        query$.next(0);
      },
    });
  };

  useEffect(() => {
    console.log('My Positions : ', dataSource);
  }, [dataSource]);

  return {columns, dataSource};
}

const handleWithdraw = async (row: any) => {
  withdrawModal$.next({
    visible: true,
    userPda: row.userPda,
    marketIndex: row.marketIndex,
    marginIndex: 0,
    onFinish: () => {
      query$.next(0);
      waiverQuery$.next(0);
    },
  });
};

function renderContract(LG: any) {
  return (row: any) =>
    row.parent ? (
      ''
    ) : (
      <div className="flex flex-col">
        <span>{row.symbolName ?? ''}</span>
        <span className={clsx(row.baseAssetAmount > 0 ? 'text-green-500' : 'text-red-500')}>
          {row.baseAssetAmount > 0 ? LG(clang.Long) : LG(clang.Short)}
        </span>
      </div>
    );
}

function renderYtSt(LG: any) {
  return (row: any) =>
    row.parent ? (
      ''
    ) : (
      <div className="flex flex-col items-end w-full">
        <span>{row.baseAssetAmount ?? '-'} YT</span>
        <span>{row.quoteAssetAmount ?? '-'} ST</span>
      </div>
    );
}

function renderPNL(LG: any) {
  return (row: any) => (
    <div className="flex flex-col justify-start items-end w-full h-full">
      <div className={clsx([row.pnl > 0 && 'text-green-500'], [row.pnl < 0 && 'text-red-500'])}>
        {row?.pnl}
      </div>
      {row.marginType !== 'CROSS' && (
        <div className={clsx([row.pnl > 0 && 'text-green-500'], [row.pnl < 0 && 'text-red-500'])}>
          {!!row?.pnl && !!row?.margin ? Big(row?.pnl).div(row.margin).toFixed(2) + '%' : '-'}
        </div>
      )}
    </div>
  );
}

function renderCrLip(marginType: 'CROSS' | 'ISOLATED') {
  return (row: any) =>
    !row.parent && marginType === 'CROSS' ? (
      ''
    ) : (
      <div className="flex flex-col items-end w-full">
        <span>{!!row.cr ? Big(row.cr).times(100).toFixed(2) + '%' : '-'}</span>
        <span>{row.lipPrice}</span>
      </div>
    );
}

function renderEntry(row: any) {
  return row.parent ? (
    ''
  ) : (
    <div className="flex flex-col items-end w-full">
      <span>{row.entry ?? '-'}</span>
      <span>{row.LastPrice ?? '-'}</span>
    </div>
  );
}

function renderMargin(handleDeposit: (r: any) => void, client: any) {
  return (row: any) =>
    row.parent || row.marginType === 'ISOLATED' ? (
      <div className="flex flex-row items-start justify-right gap-8px">
        {numUtil.floor(row?.margin ?? 0, 6)} SOL
        <div className="flex flex-row items-center gap-8px">
          <Tooltip text="Deposit">
            <div
              className="flex justify-center items-center bg-green-500 rounded-4px w-24px h-24px cursor-pointer"
              onClick={() => handleDeposit(row)}
            >
              <DownIcon />
            </div>
          </Tooltip>
          <Tooltip text="Withdraw">
            <div
              className={clsx(
                'flex justify-center items-center bg-gray-80 rounded-4px w-24px h-24px rotate-180 cursor-pointer',
                [row.parent && 'ml-3px']
              )}
              onClick={() => handleWithdraw(row)}
            >
              <DownIcon color="white" />
            </div>
          </Tooltip>
          {row.marginType === 'ISOLATED' && (
            <div className="w-1px h-24px box-border border-1px border-solid border-gray-40"></div>
          )}
          {row.marginType === 'ISOLATED' && <ClosePosition row={row} client={client} />}
        </div>
      </div>
    ) : (
      <div className="flex gap-8px">
        <ClosePosition row={row} client={client} />
      </div>
    );
}
