import {Toast} from '@rx/widgets';
import type {WalletName} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
import type {SolanaSignInInput, SolanaSignInOutput} from '@solana/wallet-standard-features';
import {useCallback, useEffect, useState} from 'react';

export function useSignIn() {
  const {signIn, publicKey, select} = useWallet();
  const [signature, setSignature] = useState<SolanaSignInOutput>();

  useEffect(() => {
    select(<WalletName>'Phantom');
  }, []);

  const onSignIn = useCallback(async () => {
    try {
      if (!signIn) {
        Toast.error('Wallet does not support Sign In With Solana!');
        return;
      }

      const input: SolanaSignInInput = {
        domain: window.location.host,
        address: publicKey ? publicKey.toBase58() : undefined,
        statement: 'Sign In RateX',
      };
      const output = await signIn(input);
      setSignature(output);
    } catch (e) {
      console.error('SignIn Error: ', e);
    }
  }, [signIn]);

  return {signature, onSignIn};
}
