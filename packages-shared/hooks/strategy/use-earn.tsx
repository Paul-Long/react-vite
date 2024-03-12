import {db, useQuery} from '@rx/db';
import {lang} from '@rx/lang/account.lang';
import {lang as clang} from '@rx/lang/common.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';
import {useLang} from '../use-lang';

export function useEarn() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'id', fixed: 'left', render: (_, i) => (i ?? 0) + 1},
      {title: LG(lang.PrincipalToken), dataIndex: 'token'},
      {title: LG(clang.Maturity), dataIndex: 'matureDate'},
      {title: LG(clang.TTM), dataIndex: 'ttm'},
      {title: LG(clang.APR), dataIndex: 'apr'},
      {title: LG(lang.Underlying), dataIndex: 'underlying'},
      {title: LG(clang.Amount), dataIndex: 'amount'},
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
        fontWeight: 700,
      };
      c.align = 'center';
      if (c.dataIndex !== 'action') {
        c.bodyCellStyle = {color: '#B7BDC6', fontWeight: 700};
      }
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.strategyEarnPosition.toArray());

  return {columns, dataSource};
}
