import {Table} from '@rx/widgets';
import {useOrders} from '@trade/hooks/trade/use-orders';

interface Props {
  mode: string;
}

export function Orders(props: Props) {
  const {dataSource, columns} = useOrders();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
