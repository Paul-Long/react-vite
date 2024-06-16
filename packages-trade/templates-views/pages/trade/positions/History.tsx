import {useHistory} from '@/hooks/use-history';
import {Table} from '@rx/widgets';

export function History() {
  const {dataSource, columns} = useHistory();
  return (
    <Table
      className="w-full min-h-100px"
      border={true}
      columns={columns}
      dataSource={dataSource as any[]}
    />
  );
}
