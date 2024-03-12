import {useSyntheticAsset} from '@rx/hooks/strategy/use-synthetic-asset';
import {Table} from '@rx/widgets';
import React from 'react';

export function SyntheticAsset() {
  const {columns, dataSource} = useSyntheticAsset();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
