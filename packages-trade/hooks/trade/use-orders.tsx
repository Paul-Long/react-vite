import {db, useQuery} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback, useEffect, useState} from 'react';

export function useOrders(mode: string) {
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
      {title: LG(lang.MarginType), dataIndex: 'marginType'},
      {title: LG(clang.Contract), dataIndex: 'Contract'},
      {
        title: mode === 'YT' ? LG(clang.Amount) : LG(clang.Notional),
        dataIndex: 'amount',
        render: (record) => (mode === 'YT' ? record.amount : record.amount + ' SOL'),
      },
      {title: LG(clang.Direction), dataIndex: 'direction'},
      {title: LG(lang.Limit), dataIndex: 'liquidation'},
      {title: LG(clang.Stop), dataIndex: 'liquidation'},
      {title: LG(clang.Liq) + '.', dataIndex: 'liq'},
      {title: mode === 'YT' ? LG(lang.Leverage) : LG(clang.MR), dataIndex: 'leverage'},
      {
        title: LG(clang.Margin),
        dataIndex: 'action',
        bodyCellStyle: {background: '#00162B'},
        fixed: 'right',
        shadowLeft: true,
        render: renderAction,
      },
    ];
    columns.forEach((c, i) => {
      c.headerCellStyle = {
        color: '#E0E0E0',
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
  }, [LG, mode]);

  const dataSource = useQuery<any[]>(() =>
    db.positions.where('orderType').equals('Limit').toArray()
  );

  const renderAction = useCallback(() => {
    return (
      <div className="df fdr aic gap8px">
        <Button size="small">{LG(clang.Deposit)}</Button>
        <Button size="small">{LG(clang.Withdraw)}</Button>
      </div>
    );
  }, []);

  return {columns, dataSource};
}
