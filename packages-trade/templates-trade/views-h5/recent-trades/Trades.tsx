import type {Props} from '@/hooks/use-recent-trades';
import {useRecentTrades} from '@/hooks/use-recent-trades';
import {Table} from '@rx/widgets';

export function Trades(props: Props) {
  const {columns, dataSource} = useRecentTrades(props);
  return <Table columns={columns} dataSource={dataSource} />;
}
