import {AnchorProvider} from '@coral-xyz/anchor';
import {env} from '@rx/env';
import {useAnchorWallet, useConnection} from '@solana/wallet-adapter-react';
import {useMemo} from 'react';

export function useProvider() {
  const wallet = useAnchorWallet();
  const {connection} = useConnection();

  const provider = useMemo(() => {
    if (!wallet || env.isServer) {
      return null;
    }
    return new AnchorProvider(connection, wallet, {preflightCommitment: 'processed'});
  }, [wallet, connection]);

  return {provider};
}
