import {db, useQuery} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback, useEffect, useState} from 'react';

export function usePositions(mode: string) {
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
      {title: LG(clang.PnL), dataIndex: 'pnl', render: renderPnl},
      {
        title: LG(clang.Entry),
        dataIndex: 'entry',
        render: (record) => (mode === 'YT' ? record.entry : record.entryYield),
      },
      {
        title: LG(clang.Current),
        dataIndex: 'current',
        render: (record) => (mode === 'YT' ? record.current : record.entryYield),
      },
      {title: LG(clang.Liq) + '.', dataIndex: 'liq'},
      {title: LG(clang.TP) + '/' + LG(clang.SL), dataIndex: 'tpsl'},
      {title: mode === 'YT' ? LG(clang.CR) : LG(clang.MR), dataIndex: 'cr'},
      {
        title: LG(clang.Margin),
        dataIndex: 'action',
        fixed: 'right',
        render: renderAction,
        shadowLeft: true,
        shadowRight: true,
        bodyCellStyle: {background: '#00162B'},
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
  }, [LG, mode]);

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
        <div className="flex-1 text-right">{row?.pnl}</div>
        <div className="flex-1 text-left">
          <Button size="small" onClick={() => handleClose(row)}>
            {LG(clang.Close)}
          </Button>
        </div>
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
