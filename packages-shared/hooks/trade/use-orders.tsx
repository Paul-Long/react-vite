import {db, useQuery} from '@rx/db';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback, useEffect, useState} from 'react';
import {useLang} from '../use-lang';

export function useOrders() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {title: LG(clang.No), dataIndex: 'id'},
      {title: LG(lang.MarginType), dataIndex: 'margin'},
      {title: LG(clang.Contract), dataIndex: 'marginCross'},
      {title: LG(clang.Notional), dataIndex: 'size'},
      {title: LG(clang.Direction), dataIndex: 'direction'},
      {title: LG(lang.Limit), dataIndex: 'marketPrice'},
      {title: LG(clang.Stop), dataIndex: 'stop'},
      {title: LG(clang.Liq) + '.', dataIndex: 'liqPrice'},
      {title: LG(clang.MR), dataIndex: 'mr'},
      {
        title: LG(clang.Margin),
        dataIndex: 'action',
        bodyCellStyle: {background: '#00162B'},
        fixed: 'right',
        render: renderAction,
      },
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
      };
      c.align = 'center';
      if (c.dataIndex !== 'action') {
        c.bodyCellStyle = {color: '#B7BDC6'};
      }
    });
    setColumns(columns);
  }, [LG]);

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
