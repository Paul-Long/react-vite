import {usePositions} from '@/hooks/use-positions';
import {Table} from '@rx/widgets';

interface Props {
  marginType: 'CROSS' | 'ISOLATED';
}
export function Position(props: Props) {
  const {columns, dataSource} = usePositions(props.marginType);
  return <Table className="w-full" border={true} columns={columns} dataSource={dataSource as any[]} />;
}
