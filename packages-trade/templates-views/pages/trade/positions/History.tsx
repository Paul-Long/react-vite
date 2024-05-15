import {useHistory} from '@/hooks/use-history';
import {Table} from '@rx/widgets';

export function History() {
  const {dataSource, columns} = useHistory();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
