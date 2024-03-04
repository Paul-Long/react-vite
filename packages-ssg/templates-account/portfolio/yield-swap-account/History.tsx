import {useHistory} from '@rx/hooks/trade/use-history';
import {Table} from '@rx/widgets';
import React from 'react';

export function History() {
  const {dataSource, columns} = useHistory();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
