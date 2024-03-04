import {usePositions} from '@rx/hooks/trade/use-positions';
import {Table} from '@rx/widgets';
import React from 'react';

export function Positions() {
  const {columns, dataSource} = usePositions();
  return (
    <>
      <Table columns={columns} dataSource={dataSource as any[]} />
    </>
  );
}
