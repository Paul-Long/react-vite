import {Table} from '@rx/widgets';
import {useLpResidual} from '@trade/hooks/lp/use-lp-residual';

export function ResidualPosition() {
  const {columns, dataSource} = useLpResidual();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
