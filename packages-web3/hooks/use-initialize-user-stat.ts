import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish?: Function;
}

export function useInitializeUserStats(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(async () => {
    if (!connected) {
      return;
    }
    const tx = await client?.initializeUserStats();
    params?.onFinish?.(tx);
  }, [connected]);

  return {
    submit,
  };
}
