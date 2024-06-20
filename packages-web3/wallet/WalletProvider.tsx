'use client';
import bs58 from 'bs58';
import {ReactNode, useCallback, useMemo, useState} from 'react';
import {Adapter} from './adapters/BaseAdapter';
import {WalletContext} from './use-wallet';

export function WalletProvider({children, wallets}: {children: ReactNode; wallets: Adapter[]}) {
  const [walletName, setWalletName] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const adapter = useMemo(() => {
    if (!walletName) {
      const wallet = wallets.find((wallet) => wallet.connected) || null;
      if (wallet) {
        setWalletName(wallet.name);
        return wallet;
      }
    }
    return wallets.find((wallet) => wallet.name === walletName) || null;
  }, [wallets, walletName]);

  const handleSelect = useCallback(
    async (name: string) => {
      if (walletName === name) return;
      if (adapter && adapter.name !== name) {
        await adapter.disconnect();
      }
      const wallet = wallets.find((wallet) => wallet.name === name) || null;

      function handleDisconnect() {
        setWalletName(null);
        setConnected(false);
      }

      wallet?.on('disconnect', handleDisconnect);

      await wallet?.connect();

      if (wallet?.connected) {
        setConnected(true);
      }
      setWalletName(name);
    },
    [wallets, adapter, walletName]
  );

  const signMessage = useCallback(
    async (name: string) => {
      if (walletName === name) return null;
      if (adapter && adapter.name !== name) {
        await adapter.disconnect();
      }

      const wallet = wallets.find((wallet) => wallet.name === name) || null;

      function handleDisconnect() {
        setWalletName(null);
        setConnected(false);
      }

      wallet?.on('disconnect', handleDisconnect);

      await wallet?.connect();

      const message = new TextEncoder().encode('Welcome to RateX ' + wallet?.publicKey?.toBase58());
      const signature = await wallet?.signMessage(message);
      if (wallet?.connected) {
        setConnected(true);
      }
      setWalletName(name);
      if (signature) {
        const result = {
          signature: bs58.encode(signature),
          signedMessage: bs58.encode(message),
          publicKey: wallet?.publicKey?.toBase58(),
        };
        return result;
      }
      return null;
    },
    [adapter, walletName]
  );

  const handleConnect = useCallback(async () => {
    await adapter?.connect();

    if (adapter?.connected) {
      setConnected(true);
    }
  }, [adapter]);

  return (
    <WalletContext.Provider
      value={{
        connecting: false,
        connected,
        disconnecting: false,
        publicKey: null,
        wallet: adapter,
        wallets,
        select: handleSelect,
        connect: handleConnect,
        signMessage,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
