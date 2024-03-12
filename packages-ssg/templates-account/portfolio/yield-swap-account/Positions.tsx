import {usePositions} from '@rx/hooks/trade/use-positions';
import {Table} from '@rx/widgets';
import React from 'react';

interface Props {
  mode: string;
}

export function Positions(props: Props) {
  const {columns, dataSource} = usePositions(props.mode);
  return (
    <>
      <Table columns={columns} dataSource={dataSource as any[]} />
    </>
  );
}
