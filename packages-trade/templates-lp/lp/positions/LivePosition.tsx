import {Table} from '@rx/widgets';
import {useLpLive} from '@trade/hooks/lp/use-lp-live';

export function LivePosition() {
  const {columns, dataSource} = useLpLive();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
