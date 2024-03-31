import {DriftClient} from '@/sdk/drift-client';
import {driftClient$} from '@/streams/drift-client';
import {Wallet} from '@coral-xyz/anchor';
import {useStream} from '@rx/hooks/use-stream';
import {Adapter, WalletAdapterNetwork, WalletError} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-phantom';
import {
  ConnectionProvider,
  WalletProvider,
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import {clusterApiUrl} from '@solana/web3.js';
import {FC, ReactNode, useCallback, useEffect, useMemo} from 'react';

export const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const network = WalletAdapterNetwork.Devnet;

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
  return (
    <WalletContextProvider>
      {children}
      <InitDriftClient />
    </WalletContextProvider>
  );
};

export const InitDriftClient: FC = () => {
  const [client, setClient] = useStream<DriftClient | null>(driftClient$);
  const {connection} = useConnection();
  const wallet = useAnchorWallet();
  useEffect(() => {
    if (!client) {
      setClient(new DriftClient({connection, wallet: wallet as Wallet}));
      return;
    }
    if (!!wallet) {
      client.updateWallet(wallet);
    }
  }, [client, connection, wallet]);
  return <></>;
};
