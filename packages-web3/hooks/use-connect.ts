import type {WalletName} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
import {useCallback, useEffect} from 'react';

export function useConnect() {
  const {select, connected, connect, disconnect, publicKey} = useWallet();

  useEffect(() => {
    select(<WalletName>'Phantom');
  }, [select]);

  const onConnect = useCallback(async () => {
    await connect();
  }, [connect]);

  const onDisconnect = useCallback(async () => {
    await disconnect();
  }, [disconnect]);

  return {connected, publicKey, address: publicKey?.toBase58(), onConnect, onDisconnect};
}
