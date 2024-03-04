import {useTrades} from '@/trade/recent-trades/state';
import {Table} from '@rx/widgets';
import React from 'react';

export function Trades(props: {type: string}) {
  const {columns, dataSource} = useTrades(props);
  return <Table columns={columns} dataSource={dataSource} />;
}
