import {db, useQuery} from '@rx/db';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import type {Column} from '@rx/widgets/table/types';
import {useEffect, useState} from 'react';

export function useSyntheticAsset() {
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
      {title: LG(lang.UnderlyingAsset), dataIndex: 'UnderlyingAsset'},
      {
        title: LG(clang.MaturityDate),
        dataIndex: 'MaturityDate',
        render: (record) => timeUtil.formatDate(new Date(record.MaturityDate).getTime()),
      },
      {title: LG(lang.RWAToken), dataIndex: 'RWAToken'},
      {title: LG(clang.TTM), dataIndex: 'TTM'},
      {title: LG(clang.APR), dataIndex: 'APR'},
      {
        title: LG(clang.Amount),
        dataIndex: 'Amount',
        fixed: 'right',
        shadowLeft: true,
        bodyCellStyle: {background: '#00162B'},
        width: '150px',
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

  const dataSource = useQuery<any[]>(() => db.strategySyntheticAsset.toArray());

  return {columns, dataSource};
}
