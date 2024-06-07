import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import {useCallback} from 'react';

interface Params {
  onFinish: Function;
}

export function useAddLiquidity(params: Params) {
  const [client] = useStream(rateXClient$);
  const {connected, connect} = useConnect();

  const submit = useCallback(
    async (
      tickLowerIndex: number,
      tickUpperIndex: number,
      liquidityAmount: number,
      marketIndex: number = 0
    ) => {
      if (!connected) {
        return;
      }
      const tx = await client?.addPerpLpShares({
        tickLowerIndex,
        tickUpperIndex,
        liquidityAmount,
        marketIndex,
      });
      params?.onFinish(tx);
    },
    [connected, params]
  );

  return {
    queryIndex: 0,
    submit,
  };
}
