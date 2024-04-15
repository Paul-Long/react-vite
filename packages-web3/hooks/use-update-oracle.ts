import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish?: Function;
}

export function useUpdateOracle(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (marketRate: number, rate: number) => {
      if (!connected) {
        return;
      }
      const tx = await client?.updateOracle({marketRate, rate});
      params?.onFinish?.(tx);
    },
    [connected]
  );

  return {
    submit,
  };
}
