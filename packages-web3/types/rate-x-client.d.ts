import {Wallet} from '@coral-xyz/anchor';
import type {ConfirmOptions, Connection, PublicKey} from '@solana/web3.js';

export type RateXClientConfig = {
  connection: Connection;
  programID?: PublicKey;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
};
