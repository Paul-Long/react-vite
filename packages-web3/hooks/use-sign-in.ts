import {Toast} from '@rx/widgets';
import type {WalletName} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
import type {SolanaSignInInput} from '@solana/wallet-standard-features';
import bs58 from 'bs58';
import {useCallback, useEffect} from 'react';

interface Params {
  onFinish: Function;
}

export function useSignIn(params: Params) {
  const {signIn, publicKey, select} = useWallet();

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
        statement: 'Welcome to RateX',
      };
      const output = await signIn(input);

      const result: SignResult = {
        signature: bs58.encode(output.signature),
        signedMessage: bs58.encode(output.signedMessage),
        publicKey: bs58.encode(output.account.publicKey),
      };
      console.log('sign result: ', result);
      params.onFinish?.(result);
    } catch (e) {
      console.error('SignIn Error: ', e);
    }
  }, [signIn]);

  return {onSignIn};
}
