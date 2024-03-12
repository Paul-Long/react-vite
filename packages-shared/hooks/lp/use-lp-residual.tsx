import {db, useQuery} from '@rx/db';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback, useEffect, useState} from 'react';
import {useLang} from '../use-lang';

export function useLpResidual() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'id', fixed: 'left', render: (_, i) => (i ?? 0) + 1},
      {title: LG(lang.Pool), dataIndex: 'Contract'},
      {title: LG(lang.LockedValue), dataIndex: 'LockedValue'},
      {
        title: LG(lang.Obligation),
        dataIndex: 'Obligation',
      },
      {
        title: LG(lang.Collateral),
        dataIndex: 'Collateral',
      },
      {
        title: LG(lang.WithdrawableValue),
        dataIndex: 'WithdrawableValue',
      },
      {
        title: LG(clang.Liquidity),
        dataIndex: 'Liquidity',
        fixed: 'right',
        renderTitle: () => <span></span>,
        render: (record: any) => {
          return (
            <div className="df gap10px">
              <Button type="default" size="small" onClick={() => handleClose(record)}>
                {LG(clang.Close)}
              </Button>
              <Button type="default" size="small">
                {LG(clang.Withdraw)}
              </Button>
            </div>
          );
        },
      },
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
      };
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.lpResidualPosition.toArray());

  const handleClose = useCallback(async (row: any) => {
    const {id} = row;
    await db.lpResidualPosition.delete(id);
  }, []);

  return {columns, dataSource};
}
