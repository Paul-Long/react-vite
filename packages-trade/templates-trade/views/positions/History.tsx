import {Table} from '@rx/widgets';
import {useHistory} from '@trade/hooks/trade/use-history';

export function History() {
  const {dataSource, columns} = useHistory();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
