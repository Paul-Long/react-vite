import {db, useQuery} from '@rx/db';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';
import {useLang} from '../use-lang';

export function useHistory() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {title: LG(clang.No), dataIndex: 'id'},
      {title: LG(lang.MarginType), dataIndex: 'margin'},
      {title: LG(clang.Contract), dataIndex: 'marginCross'},
      {title: LG(clang.Direction), dataIndex: 'direction'},
      {title: LG(clang.Order), dataIndex: 'order'},
      {title: LG(clang.Notional), dataIndex: 'size'},
      {title: LG(clang.Amount), dataIndex: 'amount'},
      {title: LG(clang.Entry), dataIndex: 'yield'},
      {title: LG(lang.EntryYield), dataIndex: 'entryYield'},
      {title: LG(lang.EntryPrice), dataIndex: 'entryPrice'},
      {title: LG(lang.TradingFee), dataIndex: 'tradingFee'},
      {title: LG(lang.Transaction), dataIndex: 'transaction'},
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
      };
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.closePositions.toArray());

  return {columns, dataSource};
}
