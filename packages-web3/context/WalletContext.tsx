import {Adapter, WalletAdapterNetwork, WalletError} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-phantom';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {clusterApiUrl} from '@solana/web3.js';
import React, {FC, ReactNode, useCallback, useMemo} from 'react';

export const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const network = WalletAdapterNetwork.Testnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  const onError = useCallback((error: WalletError, adapter?: Adapter) => {
    console.error(error, adapter);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<{children: ReactNode}> = ({children}) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};
