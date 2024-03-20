import {Table} from '@rx/widgets';
import {useSyntheticAsset} from '@trade/hooks/strategy/use-synthetic-asset';

export function SyntheticAsset() {
  const {columns, dataSource} = useSyntheticAsset();
  return <Table columns={columns} dataSource={dataSource as any[]} />;
}
