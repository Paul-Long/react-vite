import type {WalletName} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
import {useCallback, useEffect} from 'react';

export function useConnect() {
  const wallet = useWallet();

  useEffect(() => {
    wallet.select(<WalletName>'Phantom');
  }, []);

  const connect = useCallback(async () => {
    await wallet.connect();
  }, [wallet]);

  const disconnect = useCallback(async () => {
    await wallet.disconnect();
  }, [wallet]);

  return {address: wallet?.publicKey?.toBase58(), connect, disconnect, connected: wallet.connected};
}
