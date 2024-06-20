import {RatexContracts} from '@/types/ratex_contracts';
import {Program, Wallet} from '@coral-xyz/anchor';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';

export const tranUtil = {
  sendViewTransaction: async (
    program: Program<RatexContracts>,
    authority: PublicKey,
    instructions: TransactionInstruction[]
  ) => {
    try {
      const recentBlockhash = await program.provider.connection.getRecentBlockhash();
      const message = new TransactionMessage({
        payerKey: authority as any,
        recentBlockhash: recentBlockhash.blockhash,
        instructions,
      }).compileToV0Message([]);

      let versionedTransaction = new VersionedTransaction(message);

      const result = await program.provider.connection.simulateTransaction(versionedTransaction, {
        sigVerify: false,
      });
      console.log('View Transaction Result : ', result);
      return result;
    } catch (e) {
      console.error('Send View Transaction Error: ', e);
    }
  },

  sendTransaction: async (
    connection: Connection,
    wallet: Wallet,
    authority: PublicKey,
    combinedTransaction: Transaction
  ) => {
    try {
      combinedTransaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      combinedTransaction.feePayer = authority;
      const signedTransaction = await wallet.signTransaction(combinedTransaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: true,
      });
      await connection.confirmTransaction(signature, 'confirmed');
      console.log('Combined Transaction successful!', signature);
      return signature;
    } catch (error) {
      console.error('Combined Transaction failed', error);
      return null;
    }
  },
};
