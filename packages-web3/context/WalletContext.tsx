import {RateClient} from '@/sdk';
import {rateXClient$} from '@/streams/rate-x-client';
import {BackpackWalletAdapter} from '@/wallets/BackpackWalletAdapter';
import {useStream} from '@rx/hooks/use-stream';
import {Adapter, WalletAdapterNetwork, WalletError} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-phantom';
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {SolflareWalletAdapter} from '@solana/wallet-adapter-solflare';
import {FC, ReactNode, useCallback, useEffect, useMemo} from 'react';

export const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(
    // () => 'https://devnet.helius-rpc.com/?api-key=21f80e34-a310-431d-b970-ecb7a7c16565',
    // () => 'https://convincing-green-sea.solana-devnet.quiknode.pro/e155ea13e0808fe562d72760eaf1c69daf3498c2/',
    () =>
      'https://devnet.helius-rpc.com/?api-key=bf9a9af8-1784-4541-9835-480959a58da4',
    // () => 'https://rpc.rate-x.io',
    // () => clusterApiUrl(network),
    [network]
  );

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new BackpackWalletAdapter()],
    [network]
  );

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
  const [client, setClient] = useStream<RateClient | null>(rateXClient$);
  const {connection} = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    const checkConnection = () => {
      if (!wallet.connected) {
        window.location.reload();
      }
    };
    let intervalId: any;
    if (wallet.connected) {
      intervalId = setInterval(checkConnection, 10000);
    }
    return () => {
      !!intervalId && clearInterval(intervalId);
    };
  }, [wallet]);

  useEffect(() => {
    if (!!wallet && wallet.connected) {
      if (!client) {
        setClient(new RateClient({connection, wallet: wallet as any}));
      } else {
        client.updateWallet(wallet);
      }
    } else {
      setClient(null);
    }
  }, [client, wallet]);
  return <></>;
};
