import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {RateXPlaceOrderParams} from '@/types/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish: Function;
}

export function useOrderPlace(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (order: RateXPlaceOrderParams) => {
      if (!connected) {
        return;
      }
      const tx = await client?.placeOrder2(order);
      params?.onFinish(tx);
    },
    [connected, params, client]
  );

  return {
    submit,
    client,
  };
}
