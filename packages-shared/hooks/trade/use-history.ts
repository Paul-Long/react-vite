import {db, useQuery} from '@rx/db';
import {timeUtil} from '@rx/helper/time';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';
import {useLang} from '../use-lang';

const dataMap: any = {
  CrossMargin: 'Cross',
  IsolatedMargin: 'Isolated',
};

export function useHistory() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'id', render: (_, i) => (i ?? 0) + 1, fixed: 'left'},
      {title: LG(lang.MarginType), dataIndex: 'marginType'},
      {title: LG(clang.Contract), dataIndex: 'Contract'},
      {title: LG(clang.Direction), dataIndex: 'direction'},
      {title: LG(clang.Order), dataIndex: 'orderType'},
      {
        title: LG(clang.Notional),
        dataIndex: 'notional',
        render: (record) => (record.mode === 'YT' ? '-' : record.amount + ' SOL'),
      },
      {
        title: LG(clang.Amount),
        dataIndex: 'amount',
        render: (record) => (record.mode === 'YT' ? record.amount : '-'),
      },
      {
        title: LG(lang.EntryYield),
        dataIndex: 'entryYield',
        render: (record) => (record.mode === 'YT' ? '-' : record.entry),
      },
      {
        title: LG(lang.EntryPrice),
        dataIndex: 'entryPrice',
        render: (record) => (record.mode === 'YT' ? record.entry : '-'),
      },
      {title: LG(lang.TradingFee), dataIndex: 'estimatedTradingFee'},
      {
        title: LG(lang.Transaction),
        dataIndex: 'transaction',
        fixed: 'right',
        render: (record) => timeUtil.formatDateTime(record.transaction),
      },
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
        fontWeight: 700,
      };
      c.bodyCellStyle = {color: '#B7BDC6', fontWeight: 700};
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.closePositions.toArray());

  return {columns, dataSource};
}
