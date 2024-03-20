import {db, useQuery} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {lang as clang} from '@rx/lang/common.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';

export function useEarn() {
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
        bodyCellStyle: {background: '#00162B'},
        render: (_, i) => (i ?? 0) + 1,
      },
      {title: LG(lang.PrincipalToken), dataIndex: 'token'},
      {title: LG(clang.Maturity), dataIndex: 'matureDate'},
      {title: LG(clang.TTM), dataIndex: 'ttm'},
      {title: LG(clang.APR), dataIndex: 'apr'},
      {title: LG(lang.Underlying), dataIndex: 'underlying'},
      {
        title: LG(clang.Amount),
        fixed: 'right',
        shadowLeft: true,
        bodyCellStyle: {background: '#00162B'},
        width: '150px',
        dataIndex: 'amount',
      },
    ];
    columns.forEach((c, i) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
        fontWeight: 700,
      };
      if (i !== 0) {
        c.align = 'center';
      }
      if (c.dataIndex !== 'action' && c.dataIndex !== 'id') {
        c.bodyCellStyle = {color: '#B7BDC6', fontWeight: 700};
      }
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.strategyEarnPosition.toArray());

  return {columns, dataSource};
}
