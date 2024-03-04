import {useMint} from '@/hooks/use-mint';
import {useProgram} from '@/hooks/use-program';
import {useStakeInfo} from '@/hooks/use-stake-info';
import type {Accounts} from '@coral-xyz/anchor';
import {BN} from '@coral-xyz/anchor';
import type {IdlAccountItem} from '@coral-xyz/anchor/dist/cjs/idl';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {useWallet} from '@solana/wallet-adapter-react';
import {SystemProgram} from '@solana/web3.js';
import {useCallback} from 'react';

export function useDeposit() {
  const {publicKey} = useWallet();
  const {mint} = useMint();
  const {program, configPda} = useProgram();
  const {getStakeInfo} = useStakeInfo();

  const onDeposit = useCallback(async () => {
    const info = await getStakeInfo();
    if (!info || !mint || !program || !publicKey) {
      return;
    }
    const accounts: Accounts<IdlAccountItem> = {
      config: configPda,
      user: info.userKey,
      payer: publicKey,
      mintAccount: mint,
      vaultAccount: info.vaultAccount,
      userTokenAccount: info.userTokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    };

    await program?.rpc.deposit(new BN(1), {accounts});
  }, [getStakeInfo, configPda, mint, program, publicKey]);
}
