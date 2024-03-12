import {useEarn} from '@rx/hooks/strategy/use-earn';
import {Table} from '@rx/widgets';
import React from 'react';

export function Earn() {
  const {columns, dataSource} = useEarn();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
