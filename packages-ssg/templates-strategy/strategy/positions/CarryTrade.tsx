import {useCarryTrade} from '@rx/hooks/strategy/use-carry-trade';
import {Table} from '@rx/widgets';
import React from 'react';

export function CarryTrade() {
  const {columns, dataSource} = useCarryTrade();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
