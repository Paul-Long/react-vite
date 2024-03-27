import {RatexContracts} from '@/idl/ratex_contracts';
import {getUserAccountPublicKey} from '@/sdk/utils';
import type {Program} from '@coral-xyz/anchor';
import {Toast} from '@rx/widgets';
import {Connection, PublicKey} from '@solana/web3.js';

export async function initializeUser(
  connection: Connection,
  program?: Program<RatexContracts> | null,
  publicKey?: PublicKey | null
) {
  return new Promise(function (resolve, reject) {
    import('@coral-xyz/anchor').then(async (anchor) => {
      if (!publicKey || !program) {
        reject(false);
        return;
      }
      const subaccount_id = 0;
      const userAccountPublicKey = await getUserAccountPublicKey(
        program?.programId as PublicKey,
        publicKey as any,
        0
      );
      if (!(await checkAccountBalance(connection, publicKey))) {
        reject(false);
        return;
      }
      const checked = await checkIfAccountExists(connection, userAccountPublicKey);
      if (checked) {
        reject(true);
        return;
      }

      console.log('initialize user params: ', {
        user: userAccountPublicKey.toBase58(),
        authority: publicKey.toBase58(),
        payer: publicKey.toBase58(),
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      });

      const tx = await program?.rpc?.initializeUser(subaccount_id, {
        accounts: {
          user: userAccountPublicKey,
          authority: publicKey,
          payer: publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        } as any,
      });
      console.log('Initialize tx', tx);
      resolve(tx);
    });
  });
}

async function checkIfAccountExists(connection: Connection, account: PublicKey): Promise<boolean> {
  try {
    const accountInfo = await connection.getAccountInfo(account);
    console.log('account info :', accountInfo);
    return accountInfo != null;
  } catch (e) {
    // Doesn't already exist
    return false;
  }
}

async function checkAccountBalance(connection: Connection, publicKey: PublicKey): Promise<boolean> {
  try {
    const balance = await connection.getBalance(publicKey);
    if (balance > 0) {
      return true;
    } else {
      Toast.error(`Balance need > 0 [${balance}]`);
      return false;
    }
  } catch (e) {
    // Doesn't already exist
    return false;
  }
}
