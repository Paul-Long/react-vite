import {useProgram} from '@/hooks/use-program';
import {PublicKey} from '@solana/web3.js';
import {useEffect, useState} from 'react';

export function useMint() {
  const {program, configPda} = useProgram();
  const [mints, setMints] = useState<PublicKey[]>([]);

  useEffect(() => {
    (async () => {
      if (!program) {
        return;
      }
      const res = (await program.account.config.fetchNullable(configPda)) as {assets: PublicKey[]};
      if (!res) {
        return;
      }
      setMints(res.assets);
    })();
  }, [program]);

  return {mints, mint: mints?.[0]};
}
