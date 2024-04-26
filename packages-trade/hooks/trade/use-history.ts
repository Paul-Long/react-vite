import {db, useQuery} from '@rx/db';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';

export function useHistory() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {
        title: LG(clang.No) + '.',
        dataIndex: 'id',
        fixed: 'left',
        width: '80px',
        shadowRight: true,
        headerCellStyle: {background: '#000'},
        bodyCellStyle: {background: '#000'},
        render: (_, i) => (i ?? 0) + 1,
      },
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
        render: (record) => (record.mode === 'YT' ? '-' : record.entryYield),
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
        shadowLeft: true,
        headerCellStyle: {background: '#000'},
        bodyCellStyle: {background: '#000'},
        render: (record) => timeUtil.formatDateTime(record.transaction),
      },
    ];
    columns.forEach((c, i) => {
      if (i !== 0) {
        c.align = 'center';
      }
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.closePositions.toArray());

  return {columns, dataSource};
}
