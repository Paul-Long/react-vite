import {Table} from '@rx/widgets';
import {usePositions} from '@trade/hooks/trade/use-positions';

interface Props {
  mode: string;
}
export function Position(props: Props) {
  const {columns, dataSource} = usePositions(props.mode);
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
