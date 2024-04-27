import {useObservable} from '@rx/hooks/use-observable';
import {kLine$} from '@rx/streams/trade/kline';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {StyledWrap} from './styles';

export function Kline() {
  const kline = useObservable(kLine$, []);
  return (
    <StyledWrap className="flex flex-col gap-24px max-h-500px min-h-500px overflow-y-auto">
      <h2>Kline Data</h2>
      <Table columns={columns} dataSource={kline} />
    </StyledWrap>
  );
}

const columns: Column[] = [
  {title: 'Time', dataIndex: 'closeTime'},
  {title: 'Open', dataIndex: 'open'},
  {title: 'High', dataIndex: 'high'},
  {title: 'Low', dataIndex: 'low'},
  {title: 'Close', dataIndex: 'close'},
];
