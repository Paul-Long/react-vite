import {useLang} from '@rx/hooks/use-lang';
import {Checkbox, Table} from '@rx/widgets';
import {useCallback} from 'react';

export function TestTemplate() {
  const {LG} = useLang();

  const genColumns = useCallback(() => {
    return [
      {title: 'Coin', dataIndex: 'coin', fixed: 'left'},
      {title: 'Amount0', dataIndex: 'amount'},
      {title: 'Amount1', dataIndex: 'amount1'},
      {title: 'Amount2', dataIndex: 'amount2'},
      {title: 'Amount3', dataIndex: 'amount3'},
      {title: 'Amount4', dataIndex: 'amount4'},
      {title: 'Amount5', dataIndex: 'amount5'},
      {title: 'Amount6', dataIndex: 'amount6'},
      {title: 'Amount7', dataIndex: 'amount7'},
      {title: 'Amount8', dataIndex: 'amount8'},
      {title: 'Amount9', dataIndex: 'amount9'},
      {title: 'Amount10', dataIndex: 'amount10'},
      {title: 'Amount11', dataIndex: 'amount11'},
      {title: 'Amount12', dataIndex: 'amount12'},
      {title: 'Amount13', dataIndex: 'amount13'},
      {title: 'Amount14', dataIndex: 'amount14'},
      {title: 'Amount15', dataIndex: 'amount15'},
      {title: 'Action', dataIndex: 'action', fixed: 'right', render: () => <span>Approve</span>},
    ];
  }, []);

  return (
    <div className="w100% max-w1200px overflow-hidden">
      <div className="p-50px">
        <Checkbox>ALL</Checkbox>
      </div>
      <Table columns={genColumns()} dataSource={dataSource} />
    </div>
  );
}

const dataSource = [
  {coin: 'BTC', amount: 0.2315},
  {coin: 'ETH', amount: 2341.123},
  {coin: 'USDT', amount: 1239912.23123},
];
