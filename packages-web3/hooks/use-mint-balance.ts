import {useConnect} from '@/hooks/use-connect';
import {rateXClient$} from '@/streams/rate-x-client';
import {useStream} from '@rx/hooks/use-stream';
import Big from 'big.js';
import {useCallback, useEffect, useState} from 'react';

export function useMintBalance() {
  const [client] = useStream(rateXClient$);
  const [balance, setBalance] = useState<string | number>(0);
  const {connected, connect} = useConnect();

  useEffect(() => {
    query().then();
  }, []);

  const query = useCallback(async () => {
    if (!connected) {
      return;
    }
    const account = await client?.getUserMintAccount();
    if (!!account) {
      const b = await client?.getTokenAccountBalance(account);
      setBalance(Big(b).div(1_000_000_000).toFixed(4));
    }
  }, [connected]);

  return {
    balance,
    query,
  };
}
