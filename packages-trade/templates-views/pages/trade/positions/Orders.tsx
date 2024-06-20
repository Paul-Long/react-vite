import {useOrders} from '@/hooks/use-orders';
import {Table} from '@rx/widgets';

interface Props {}

export function Orders(props: Props) {
  const {dataSource, columns} = useOrders();
  return (
    <Table
      border={true}
      className="w-full min-h-100px"
      columns={columns}
      dataSource={dataSource as any[]}
    />
  );
}
