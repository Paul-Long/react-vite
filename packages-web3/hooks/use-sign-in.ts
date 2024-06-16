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
  const {select, connect, signMessage, signIn, publicKey} = useWallet();

  useEffect(() => {
    select(<WalletName>'Phantom');
    // select(<WalletName>'OKX');
    // select(<WalletName>'Backpack');
    // select(<WalletName>'Solflare');
    // connect().then();
  }, [select, connect]);

  const onSignIn = useCallback(async () => {
    try {
      // if (signMessage && publicKey) {
      //   const message = new TextEncoder().encode(
      //     'Welcome to RateX account: ' + publicKey.toBase58()
      //   );
      //   const sig: any = await signMessage(message);
      //   // const isValid = await SignatureVerification.verify(sig.publicKey, message, signature);
      //   const isValid = ed25519.verify(sig, message, publicKey.toBytes());
      //   console.log('Is the signature valid?', isValid);
      //   const result: SignResult = {
      //     signature: bs58.encode(sig),
      //     signedMessage: bs58.encode(message),
      //     publicKey: bs58.encode(publicKey.toBytes()),
      //   };
      //   console.log(result);
      //   params.onFinish?.(result);
      //   return result;
      // }
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

  return {onSignIn};
}
