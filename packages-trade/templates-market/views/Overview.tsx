import {Table} from '@rx/widgets';
import {useMarketOverview} from '@trade/hooks/market/use-market-overview';

export function Overview({onSelect}: any) {
  const {genColumns, dataSource} = useMarketOverview();
  return <Table columns={genColumns()} dataSource={dataSource} onRowSelect={onSelect} />;
}
