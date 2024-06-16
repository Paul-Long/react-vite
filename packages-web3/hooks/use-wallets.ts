import {useWallet} from '@solana/wallet-adapter-react';

export function useWallets() {
  const {wallet, wallets, connected, publicKey, connecting, disconnecting} = useWallet();
  return {wallet, wallets, connected, publicKey, connecting, disconnecting};
}
