import {useOrders} from '@rx/hooks/trade/use-orders';
import {Table} from '@rx/widgets';
import React from 'react';

interface Props {
  mode: string;
}

export function Orders(props: Props) {
  const {dataSource, columns} = useOrders(props.mode);
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
