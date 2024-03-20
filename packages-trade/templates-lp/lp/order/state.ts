import {data} from '@/lp/pools-market/data';
import {select$} from '@/lp/stream/streams';
import {db} from '@rx/db';
import {useStream} from '@rx/hooks/use-stream';
import {Toast} from '@rx/widgets';
import {useCallback, useEffect, useState} from 'react';

export function useForm() {
  const [select] = useStream(select$);
  const [record, setRecord] = useState<any>({});
  const [amount, setAmount] = useState(10);
  const [range, setRange] = useState('6.00% - 8.00%');

  useEffect(() => {
    const order = data.find((d) => d.Contract === select);
    if (order) {
      setRecord(order);
    }
  }, [select]);

  const handleSubmit = useCallback(() => {
    let order: any = data.find((d) => d.Contract === select);
    if (order) {
      let params: any = {...order, Range: order.Contract.includes('ULP') ? '-' : range};
      db.lpLivePosition.add(params);
      Toast.success('Add Liquidity Success');
    }
  }, [select, range]);

  return {handleSubmit, amount, setAmount, record, range, setRange};
}
