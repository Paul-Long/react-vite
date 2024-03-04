import {useContract} from '@/trade/hooks/contract';
import {data} from '@/trade/mock/recent-trades/msol-yt';
import {openRecent$, resize$} from '@/trade/streams/streams';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Column} from '@rx/widgets/table/types';
import {useCallback, useEffect, useMemo, useState} from 'react';

export function useRecent() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const subscription = openRecent$.subscribe((o) => setOpen(o));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      resize$.next(open);
    }, 200);
  }, [open]);

  const handleClick = useCallback(() => setOpen(!open), [open]);

  return {open, handleClick};
}

export function useTrades(props: {type: string}) {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);
  const {contract} = useContract();

  useEffect(() => {
    const firstColumnMap: any = {
      yT: [
        {title: LG(clang.Price), dataIndex: 'Price'},
        {title: LG(clang.Amount), dataIndex: 'Amount'},
      ],
      IRS: [
        {title: LG(clang.Yield), dataIndex: 'Yield'},
        {title: LG(clang.Notional), dataIndex: 'Notional'},
      ],
    };
    const columns: Column[] = [
      ...firstColumnMap[props.type],
      {title: LG(clang.Time), dataIndex: 'Time'},
      {title: LG(clang.Date), dataIndex: 'Date'},
    ];
    columns.forEach((c) => {
      c.bodyCellStyle = {
        fontSize: '12px',
        padding: '10px 12px',
      };
      c.headerCellStyle = {
        color: '#fff',
        fontSize: '12px',
        background: '#0A253D',
        padding: '10px 12px',
      };
    });
    setColumns(columns);
  }, [LG, props]);

  const dataSource = useMemo(
    () => (contract ? data?.[contract]?.[props.type] ?? [] : []),
    [contract, props, data]
  );

  return {columns, dataSource};
}
