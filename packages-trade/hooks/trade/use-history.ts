import {tradeApi} from '@rx/api/trade.ts';
import {numUtil} from '@rx/helper/num.ts';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';

export function useHistory() {
  const {LG} = useLang();
  const [dataSource, setDataSource] = useState<any[]>([]);
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
      {
        title: LG(lang.MarginType),
        dataIndex: 'marginType',
        render: (row: any) => (row.PositionType === '1' ? LG(lang.Isolated) : LG(lang.Cross)),
      },
      {title: LG(clang.Contract), dataIndex: 'Symbol'},
      {
        title: LG(clang.Direction),
        dataIndex: 'direction',
        render: (row: any) => (row.Side === '1' ? LG(clang.Long) : LG(clang.Short)),
      },
      {title: LG(clang.Order), dataIndex: 'orderType'},
      {
        title: LG(clang.Amount),
        dataIndex: 'LastQty',
        render: (row: any) => (row?.LastQty ? numUtil.trimEnd0(row?.LastQty) : '-'),
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
      {
        title: LG(lang.TradingFee),
        dataIndex: 'Fee',
        render: (row: any) => (row?.Fee ? numUtil.trimEnd0(row?.Fee) : '-'),
      },
      {
        title: LG(lang.Transaction),
        dataIndex: 'UpdateTime',
        fixed: 'right',
        shadowLeft: true,
        headerCellStyle: {background: '#000'},
        bodyCellStyle: {background: '#000'},
      },
    ];
    columns.forEach((c, i) => {
      if (i !== 0) {
        c.align = 'center';
      }
    });
    setColumns(columns);
  }, [LG]);

  useEffect(() => {
    (async () => {
      const res = await tradeApi.loadOrderHistory();
      setDataSource(res?.data ?? []);
    })();
  }, []);

  return {columns, dataSource};
}
