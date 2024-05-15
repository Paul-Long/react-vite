import {useMarketOverview} from '@/pages/market/hooks/use-market-overview';
import {Table} from '@rx/widgets';

export function Overview({onSelect}: any) {
  const {genColumns, dataSource} = useMarketOverview();
  return <Table columns={genColumns()} dataSource={dataSource} onRowSelect={onSelect} />;
}
