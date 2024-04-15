import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish?: Function;
}

export function useDeposit(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (amount: number) => {
      if (!connected) {
        return;
      }
      const tx = await client?.deposit(amount);
      params?.onFinish?.(tx);
    },
    [connected]
  );

  return {
    submit,
  };
}
