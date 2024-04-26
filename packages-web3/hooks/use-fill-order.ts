import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish: Function;
}

export function useFillOrder(props: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (orderId: number) => {
      if (!connected) {
        return;
      }
      const tx = await client?.fillPerpOrder(orderId);
      props?.onFinish(tx);
    },
    [connected, props]
  );

  return {
    submit,
  };
}
