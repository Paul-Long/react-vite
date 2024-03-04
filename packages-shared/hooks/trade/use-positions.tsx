import {db, useQuery} from '@rx/db';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback, useEffect, useState} from 'react';
import {useLang} from '../use-lang';

export function usePositions() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {title: LG(clang.No), dataIndex: 'id'},
      {title: LG(lang.MarginType), dataIndex: 'margin'},
      {title: LG(clang.Contract), dataIndex: 'marginCross'},
      {title: LG(clang.Notional), dataIndex: 'size'},
      {title: LG(clang.Direction), dataIndex: 'direction'},
      {title: LG(clang.PnL), dataIndex: 'pnl', render: renderPnl},
      {title: LG(clang.Entry), dataIndex: 'yield'},
      {title: LG(clang.Current), dataIndex: 'referenceApr'},
      {title: LG(clang.Liq) + '.', dataIndex: 'liqPrice'},
      {title: LG(clang.TP) + '/' + LG(clang.SL), dataIndex: 'tpSl'},
      {title: LG(clang.CR), dataIndex: 'cr'},
      {
        title: LG(clang.Margin),
        dataIndex: 'action',
        fixed: 'right',
        render: renderAction,
        bodyCellStyle: {background: '#00162B'},
      },
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
      };
      if (c.dataIndex !== 'action') {
        c.bodyCellStyle = {color: '#B7BDC6'};
      }
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() =>
    db.positions.where('orderType').equals('Market').toArray()
  );

  const handleClose = useCallback((row: any) => {
    const {id, ...data} = row;
    db.positions.delete(row.id);
    db.closePositions.add(data);
  }, []);

  const renderPnl = useCallback((row: any) => {
    return (
      <div className="df fdr aic jcfe gap8px">
        {row?.pnl ?? 0.4789}{' '}
        <Button size="small" onClick={() => handleClose(row)}>
          {LG(clang.Close)}
        </Button>
      </div>
    );
  }, []);

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
