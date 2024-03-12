import {data} from '@/liquidity/pools-market/data';
import {select$} from '@/liquidity/stream/streams';
import {db} from '@rx/db';
import {useStream} from '@rx/hooks/use-stream';
import {Toast} from '@rx/widgets';
import {useCallback} from 'react';

export function useForm() {
  const [select] = useStream(select$);

  const handleSubmit = useCallback(() => {
    const order = data.find((d) => d.Contract === select);
    if (order) {
      const {...params} = order;
      db.lpLivePosition.add(params);
      Toast.success('Add Liquidity Success');
    }
  }, [select]);

  return {handleSubmit};
}
