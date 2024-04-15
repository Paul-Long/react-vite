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
    async (params: any) => {
      if (!connected) {
        return;
      }
      const tx = await client?.fillPerpOrder(params);
      props?.onFinish(tx);
    },
    [connected, props]
  );

  return {
    submit,
  };
}
