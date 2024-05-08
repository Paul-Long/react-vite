import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish?: Function;
}

export function useMintToUser(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (order: any) => {
      if (!connected) {
        return;
      }
      const tx = await client?.mintToUser(order);
      params?.onFinish?.(tx);
    },
    [connected, client]
  );

  return {
    submit,
    client,
  };
}
