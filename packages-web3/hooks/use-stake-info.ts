import {useMint} from '@/hooks/use-mint';
import {programID} from '@/hooks/use-program';
import {getAssociatedTokenAddressSync} from '@solana/spl-token';
import {useWallet} from '@solana/wallet-adapter-react';
import {PublicKey} from '@solana/web3.js';
import {useCallback} from 'react';

export function useStakeInfo() {
  const {publicKey} = useWallet();
  const {mints, mint} = useMint();
  const getStakeInfo = useCallback(async () => {
    if (!publicKey || !mint) {
      return null;
    }
    const [userKey] = PublicKey.findProgramAddressSync(
      [mint.toBuffer(), publicKey.toBuffer()],
      programID
    );

    const userTokenAccount = getAssociatedTokenAddressSync(mint, publicKey);

    const [vaultAccount] = PublicKey.findProgramAddressSync([mint.toBuffer()], programID);

    return {userKey, userTokenAccount, vaultAccount};
  }, [publicKey, mints]);

  return {getStakeInfo};
}
