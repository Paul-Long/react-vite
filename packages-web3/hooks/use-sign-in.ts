import {Toast} from '@rx/widgets';
import {WalletName} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
import type {SolanaSignInInput} from '@solana/wallet-standard-features';
import bs58 from 'bs58';
import {useCallback, useEffect} from 'react';

interface Params {
  onFinish: Function;
}

export function useSignIn(params: Params) {
  const {select, connect, signMessage, signIn, publicKey} = useWallet();

  useEffect(() => {
    select(<WalletName>'Phantom');
    // select(<WalletName>'OKX');
    // select(<WalletName>'Backpack');
    // select(<WalletName>'Solflare');
    // connect().then();
  }, [select, connect]);

  const onSignIn2 = useCallback(async (wallet: any) => {
    try {
      if (!wallet) {
        return;
      }
      await wallet.connect();
      const publicKey = wallet.publicKey;
      if (!publicKey) {
        return;
      }
      const message = new TextEncoder().encode('Welcome to RateX Sign in: ' + publicKey.toBase58());
      const signature = await wallet.signMessage(message);
      const result: SignResult = {
        signature: bs58.encode(signature),
        signedMessage: bs58.encode(message),
        publicKey: publicKey?.toBase58(),
      };
      params.onFinish?.(result);
    } catch (e) {}
  }, []);

  const onSignIn = useCallback(async () => {
    try {
      if (!signIn) {
        Toast.error('Wallet does not support Sign In With Solana!');
        return;
      }

      const input: SolanaSignInInput = {
        statement: 'Welcome to RateX',
      };
      const output = await signIn(input);

      const result: SignResult = {
        signature: bs58.encode(output.signature),
        signedMessage: bs58.encode(output.signedMessage),
        publicKey: bs58.encode(output.account.publicKey),
      };
      params.onFinish?.(result);
    } catch (e) {
      console.error('SignIn Error: ', e);
    }
  }, [signIn, signMessage, publicKey]);

  return {onSignIn, onSignIn2};
}
