import {useConnect} from '@/hooks/use-connect';
import {driftClient$} from '@/streams/drift-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish?: Function;
}

export function useWithdraw(params: Params) {
  const [client] = useStream(driftClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(async () => {
    if (!connected) {
      return;
    }
    const tx = await client?.withdraw();
    params?.onFinish?.(tx);
  }, [connected]);

  return {
    submit,
  };
}
