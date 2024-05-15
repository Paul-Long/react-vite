import {useOrders} from '@/hooks/use-orders';
import {Table} from '@rx/widgets';

interface Props {
  mode: string;
}

export function Orders(props: Props) {
  const {dataSource, columns} = useOrders();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
