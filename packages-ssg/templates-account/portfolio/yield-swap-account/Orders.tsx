import {useOrders} from '@rx/hooks/trade/use-orders';
import {Table} from '@rx/widgets';
import React from 'react';

export function Orders() {
  const {dataSource, columns} = useOrders();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
