import {tradeApi} from '@rx/api/trade';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {abbreviateString} from '@rx/web3/utils/string';
import type {Column} from '@rx/widgets/table/types';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';

export function useHistory() {
  const {LG} = useLang();
  const {address} = useConnect();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {
        title: LG(clang.No) + '.',
        dataIndex: 'id',
        align: 'left',
        render: (_, i) => (i ?? 0) + 1,
      },
      {
        title: LG(lang.MarginType),
        dataIndex: 'marginType',
        render: (row: any) => (row.PositionType === '1' ? LG(lang.Isolated) : LG(lang.Cross)),
      },
      {title: LG(clang.Contract), dataIndex: 'Symbol', render: renderContract(LG)},
      {
        title: 'YT/ST',
        dataIndex: 'LastQty',
        align: 'right',
        render: renderYtSt,
      },
      {
        title: 'PnL/%',
        dataIndex: 'RealizedPnl',
        align: 'right',
        render: renderPnl,
      },
      {
        title: [LG(lang.Exec), LG(clang.Price)].join('/'),
        dataIndex: 'entryYield',
        align: 'right',
        render: renderYield,
      },
      {
        title: LG(lang.OrderType),
        dataIndex: 'OCType',
        render: (row) => (
          <div className="flex flex-col">
            <span>Market Order</span>
            <span>{row.OCType == '0' ? 'Open Position' : 'Close Position'}</span>
          </div>
        ),
      },
      {
        title: LG(lang.TradingFee),
        dataIndex: 'Fee',
        align: 'right',
        render: (row: any) => (row?.Fee ? numUtil.trimEnd0(row?.Fee) : '-'),
      },
      {
        title: LG(lang.TxTime),
        dataIndex: 'UpdateTime',
        align: 'right',
        render: (row: any) => row?.UpdateTime?.slice(0, 19),
      },
      {
        title: LG(lang.TxHarsh),
        dataIndex: 'ExecID',
        align: 'right',
        render: (row: any) => (
          <a
            className="underline-solid underline"
            target="_blank"
            href={`https://explorer.solana.com/tx/${row.ExecID}?cluster=devnet`}
          >
            {abbreviateString(row.ExecID, 6, 4)}
          </a>
        ),
      },
    ];
    setColumns(columns);
  }, [LG]);

  useEffect(() => {
    (async () => {
      const res = await tradeApi.loadOrderHistory({address: address as string});
      setDataSource(res?.data ?? []);
    })();
  }, [address]);

  return {columns, dataSource};
}

function renderContract(LG: any) {
  return (row: any) => (
    <div className="flex flex-col">
      <span>{row.Symbol ?? ''}</span>
      <span
        className={clsx(
          [row.Side === '1' && 'text-green-500'],
          [row.Side === '2' && 'text-red-500']
        )}
      >
        {row.Side === '1' ? LG(clang.Long) : LG(clang.Short)}
      </span>
    </div>
  );
}

function renderYtSt(row: any) {
  return (
    <div className="flex flex-col items-end w-full">
      <span>
        {row.LastQty ? (row.Side === '1' ? '' : '-') + numUtil.trimEnd0(row.LastQty) : '-'} YT
      </span>
      <span>
        {row.Info1 ? (row.Side === '1' ? '-' : '') + numUtil.trimEnd0(row.Info1) : '-'} ST
      </span>
    </div>
  );
}

function renderYield(row: any) {
  return (
    <div className="flex flex-col items-end w-full">
      <span>{row.Yield ? Big(row.Yield).times(100).toFixed(2) + '%' : '-'}</span>
      <span>{row.LastPx ? Big(row.LastPx).toFixed(9) : '-'}</span>
    </div>
  );
}

function renderPnl(row: any) {
  return (
    <div className="flex flex-col items-end w-full">
      <span
        className={clsx(
          [row.RealizedPnl > 0 && 'text-green-500'],
          [row.RealizedPnl < 0 && 'text-red-500']
        )}
      >
        {row.RealizedPnl ? numUtil.trimEnd0(numUtil.floor(row.RealizedPnl, 6, 0)) : '-'}
      </span>
    </div>
  );
}
