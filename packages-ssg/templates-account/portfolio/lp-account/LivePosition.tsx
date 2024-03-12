import {useLpLive} from '@rx/hooks/lp/use-lp-live';
import {Table} from '@rx/widgets';
import React from 'react';

export function LivePosition() {
  const {columns, dataSource} = useLpLive();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
