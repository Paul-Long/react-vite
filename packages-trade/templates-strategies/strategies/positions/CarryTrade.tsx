import {Table} from '@rx/widgets';
import {useCarryTrade} from '@trade/hooks/strategy/use-carry-trade';

export function CarryTrade() {
  const {columns, dataSource} = useCarryTrade();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
