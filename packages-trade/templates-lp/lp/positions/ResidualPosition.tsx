import {useLpResidual} from '@rx/hooks/lp/use-lp-residual';
import {Table} from '@rx/widgets';
import React from 'react';

export function ResidualPosition() {
  const {columns, dataSource} = useLpResidual();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
