import {contract$} from '@/streams/streams';
import {data} from '@/views/mock/recent-trades/msol-yt';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {Column} from '@rx/widgets/table/types';
import {useEffect, useMemo, useState} from 'react';

export interface Props {
  mode: string;
}

export function useRecentTrades(props: Props) {
  const {mode} = props;
  const {LG} = useLang();
  const [contract] = useStream(contract$);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const firstColumnMap: any = {
      YT: [
        {title: LG(clang.Price), dataIndex: 'Price'},
        {title: LG(clang.Amount), dataIndex: 'Amount'},
      ],
      IRS: [
        {title: LG(clang.Yield), dataIndex: 'Yield'},
        {title: LG(clang.Notional), dataIndex: 'Notional'},
      ],
    };
    const columns: Column[] = [
      ...firstColumnMap[mode],
      {title: LG(clang.Time), dataIndex: 'Time'},
      {title: LG(clang.Date), dataIndex: 'Date'},
    ];
    columns.forEach((c) => {
      c.align = 'center';
      c.bodyCellStyle = {
        color: '#B7BDC6',
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
  }, [LG, mode]);

  const dataSource = useMemo(
    () => (contract ? data?.[contract]?.[props.mode] ?? [] : []),
    [contract, mode, data]
  );

  return {columns, dataSource};
}
