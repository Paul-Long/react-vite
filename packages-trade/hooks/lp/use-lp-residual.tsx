import {db, useQuery} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback, useEffect, useState} from 'react';

export function useLpResidual() {
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
      {title: LG(lang.Pool), dataIndex: 'Contract'},
      {title: LG(lang.LockedValue), dataIndex: 'LockedValue'},
      {title: LG(lang.Asset), dataIndex: 'Asset'},
      {title: LG(lang.Obligation), dataIndex: 'Obligation'},
      {title: LG(lang.Collateral), dataIndex: 'Collateral'},
      {title: LG(lang.WithdrawableValue), dataIndex: 'WithdrawableValue'},
      {
        title: LG(clang.Liquidity),
        dataIndex: 'Liquidity',
        fixed: 'right',
        shadowLeft: true,
        bodyCellStyle: {background: '#00162B'},
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
    columns.forEach((c, i) => {
      c.align = i === 0 ? 'left' : 'center';
      c.headerCellStyle = {
        color: '#E0E0E0',
        background: '#0A253D',
      };
      if (c.dataIndex !== 'action' && c.dataIndex !== 'id') {
        c.bodyCellStyle = c.bodyCellStyle || {};
        c.bodyCellStyle.color = '#B7BDC6';
        c.bodyCellStyle.fontWeight = 700;
      }
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
