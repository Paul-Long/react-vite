import {Filters} from '@/dashboard/components/Filters';
import {Title} from '@/dashboard/components/Title';
import {StyledMarketOverviewWrap} from '@/dashboard/components/styles';
import {select$} from '@/dashboard/stream/streams';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback} from 'react';
import {data} from './data';

export function MarketOverview() {
  const {LG} = useLang();
  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {title: LG(lang.Contract), dataIndex: 'Contract'},
      {title: LG(lang.MatureDate), dataIndex: 'Maturity Date'},
      {title: LG(lang.TTM), dataIndex: 'TTM'},
      {title: LG(lang.Yield), dataIndex: 'Yield'},
      {title: LG(lang.Price), dataIndex: 'Price'},
      {title: LG(lang.MinimumMR), dataIndex: 'Minimum MR'},
      {title: LG(lang.OpenInterest), dataIndex: 'Open Interest'},
      {title: LG(lang.AvaLiquidity), dataIndex: 'Available Liquidity'},
    ];
    columns.forEach((c) => {
      c.align = 'center';
      c.bodyCellStyle = {color: '#B7BDC6'};
    });
    return columns;
  }, []);
  return (
    <StyledMarketOverviewWrap className="pt24px">
      <Title className="pl24px">{LG(lang.MarketOverview)}</Title>
      <Filters />
      <Table
        columns={genColumns()}
        dataSource={data}
        onRowSelect={(row: any) => select$.next(row?.Contract)}
      />
    </StyledMarketOverviewWrap>
  );
}
