import {Title} from '@/dashboard/components/Title';
import {StyledMarketOverviewWrap} from '@/dashboard/components/styles';
import {select$} from '@/dashboard/stream/streams';
import {Filters} from '@rx-ssg/components/assets-filter/Filters';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/dashboard.lang';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback, useEffect, useState} from 'react';
import {data} from './data';

export function MarketOverview() {
  const {LG} = useLang();
  const [selected] = useStream(select$);
  const [filters, setFilters] = useState({chain: 'ALL', token: ['ALL']});
  const [dataSource, setDataSource] = useState<any[]>(data);

  useEffect(() => {
    if (!['ALL', 'SOL'].includes(filters.chain)) {
      setDataSource([]);
      return;
    }
    if (filters.token.includes('ALL')) {
      setDataSource(data);
      return;
    }
    const list = data?.filter((d: any) => filters.token.some((t) => d.Contract.includes(t)));
    setDataSource(list);
  }, [filters]);

  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {title: LG(lang.Contract), dataIndex: 'Contract'},
      {
        title: LG(lang.MatureDate),
        dataIndex: 'Maturity Date',
        render: (record) => timeUtil.formatDate(new Date(record['Maturity Date']).getTime()),
      },
      {title: LG(lang.TTM), dataIndex: 'TTM'},
      {
        title: LG(lang.Yield),
        dataIndex: 'Yield',
        render: (record) => Number(record.Yield * 100).toFixed(3) + '%',
      },
      {title: LG(lang.Price), dataIndex: 'Price'},
      {
        title: LG(lang.MinimumMR),
        dataIndex: 'Minimum MR',
        render: (record) => Number(record['Minimum MR'] * 100).toFixed(2) + '%',
      },
      {title: LG(lang.OpenInterest), dataIndex: 'Open Interest'},
      {title: LG(lang.AvaLiquidity), dataIndex: 'Available Liquidity'},
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {fontWeight: 700, background: '#0A253D', color: '#fff'};
      c.align = 'center';
      c.bodyCellStyle = {color: '#B7BDC6', fontWeight: 700};
    });
    return columns;
  }, []);

  const handleFilters = useCallback((f: {chain: string; token: string[]}) => {
    setFilters(f);
  }, []);

  return (
    <StyledMarketOverviewWrap className="pt24px">
      <Title className="pl24px">{LG(lang.MarketOverview)}</Title>
      <Filters onChange={handleFilters} />
      <Table
        rowKey="Contract"
        columns={genColumns()}
        dataSource={dataSource}
        onRowSelect={(row: any) => select$.next(row?.Contract)}
        selectedIndex={selected}
      />
    </StyledMarketOverviewWrap>
  );
}
