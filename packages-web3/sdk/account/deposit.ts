import {RatexContracts} from '@/idl/ratex_contracts';
import {getUserAccountPublicKey} from '@/sdk/utils';
import type {Program} from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';

export function deposit(program?: Program<RatexContracts> | null, publicKey?: PublicKey | null) {
  return new Promise(async function (resolve, reject) {
    try {
      const userAccountPublicKey = await getUserAccountPublicKey(
        program?.programId as PublicKey,
        publicKey as any,
        0
      );
      const marginIndex = 0; // 你的保证金索引
      const amount = new anchor.BN(1000000); // 你要存入的金额，单位为最小代币单位
      const reduceOnly = false; // 是否仅减少
      const depositRecordId = new anchor.BN(1); // 存款记录ID
      if (!publicKey) {
        return;
      }
      const tx = await program?.rpc.deposit(marginIndex, amount, reduceOnly, depositRecordId, {
        accounts: {
          user: userAccountPublicKey,
          authority: publicKey,
          marginVault: publicKey,
          userTokenAccount: publicKey,
          tokenProgram: program?.programId,
        },
        signers: [],
      });
      resolve(tx);
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
