import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish?: Function;
}

export function useInitializeUser(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (isIsolated: boolean = true, isTrader: boolean = true) => {
      if (!connected) {
        return;
      }
      const tx = await client?.initializeUser(isIsolated, isTrader);
      params?.onFinish?.(tx);
    },
    [connected]
  );

  const query = useCallback(async () => {
    return await client?.getUserAccountInfo();
  }, [connected]);

  return {
    query,
    submit,
  };
}