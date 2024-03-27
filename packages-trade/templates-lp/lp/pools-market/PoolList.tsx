import {data} from '@/lp/pools-market/data';
import {select$} from '@/lp/stream/streams';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/lp.lang';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback} from 'react';

export function PoolList() {
  const {LG} = useLang();
  const [selected] = useStream(select$);

  const genColumns = useCallback((): Column[] => {
    const columns: Column[] = [
      {title: LG(lang.Pool), dataIndex: 'Contract', fixed: 'left'},
      {title: LG(lang.RLPToken), dataIndex: 'RLPToken'},
      {title: LG(lang.RLPTokenValue), dataIndex: 'RLPValue'},
      {title: LG(lang.APR), dataIndex: 'APR'},
      {
        title: LG(lang.Maturity),
        dataIndex: 'MaturityDate',
        render: (record) =>
          record['MaturityDate']
            ? timeUtil.formatDate(new Date(record['MaturityDate']).getTime())
            : '-',
      },
      {title: LG(lang.TTM), dataIndex: 'TTM', render: (record) => `${record.TTM}`},
      {title: LG(lang.ActiveRadio), dataIndex: 'ActiveRatio'},
      {title: LG(lang.TVL), dataIndex: 'TVL'},
    ];
    columns.forEach((c: Column) => {
      c.align = 'center';
      c.headerCellStyle = {fontWeight: 700, background: '#0A253D', color: '#E0E0E0'};
      c.bodyCellStyle = {color: '#B7BDC6', fontWeight: 700};
    });
    return columns;
  }, []);

  return (
    <Table
      rowKey="Contract"
      columns={genColumns()}
      dataSource={data}
      onRowSelect={(row: any) => select$.next(row?.Contract)}
      selectedIndex={selected}
    />
  );
}
