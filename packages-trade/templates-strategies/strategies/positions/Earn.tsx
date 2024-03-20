import {Table} from '@rx/widgets';
import {useEarn} from '@trade/hooks/strategy/use-earn';

export function Earn() {
  const {columns, dataSource} = useEarn();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
