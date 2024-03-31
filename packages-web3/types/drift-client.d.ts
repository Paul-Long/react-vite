import type {Wallet} from '@coral-xyz/anchor';
import type {ConfirmOptions, Connection, PublicKey, Transaction} from '@solana/web3.js';

export type DriftClientConfig = {
  connection: Connection;
  programID?: PublicKey;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
};

export interface IWallet {
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
  publicKey: PublicKey;
}
