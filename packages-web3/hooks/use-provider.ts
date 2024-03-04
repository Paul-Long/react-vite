import {AnchorProvider} from '@coral-xyz/anchor';
import {useAnchorWallet, useConnection} from '@solana/wallet-adapter-react';
import {useMemo} from 'react';

export function useProvider() {
  const wallet = useAnchorWallet();
  const {connection} = useConnection();

  const provider = useMemo(() => {
    if (!wallet) {
      return null;
    }
    return new AnchorProvider(connection, wallet, {preflightCommitment: 'processed'});
  }, [wallet, connection]);

  return {provider};
}
