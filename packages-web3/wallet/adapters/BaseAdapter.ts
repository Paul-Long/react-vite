'use client'
import {
  Connection,
  PublicKey,
  SendOptions,
  Transaction,
  TransactionSignature,
  VersionedTransaction
} from '@solana/web3.js';
import {
  isIosAndRedirectable,
  isVersionedTransaction,
  SendTransactionOptions,
  SupportedTransactionVersions,
  TransactionOrVersionedTransaction,
  WalletReadyState
} from './adapter';
import EventEmitter from 'eventemitter3';

interface WalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
  accountChanged(newPublicKey: PublicKey): unknown;
  error(error: any): void;
  readyStateChange(readyState: WalletReadyState): void;
}

export abstract class Adapter extends EventEmitter<WalletEvents> {
  abstract name: string;
  abstract url: string;
  abstract icon: string;
  abstract readyState: WalletReadyState;
  abstract publicKey: PublicKey | null;
  abstract connecting: boolean;
  abstract supportedTransactionVersions?: SupportedTransactionVersions;

  get connected() {
    return !!this.publicKey;
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract signMessage(message: Uint8Array): Promise<Uint8Array>;

  abstract sendTransaction(
    transaction: TransactionOrVersionedTransaction<this['supportedTransactionVersions']>,
    connection: Connection,
    options?: SendTransactionOptions
  ): Promise<TransactionSignature>;

  protected async prepareTransaction(
    transaction: Transaction,
    connection: Connection,
    options: SendOptions = {}
  ): Promise<Transaction> {
    const publicKey = this.publicKey;
    if (!publicKey) throw new Error('wallet not connected');

    transaction.feePayer = transaction.feePayer || publicKey;
    transaction.recentBlockhash =
      transaction.recentBlockhash ||
      (
        await connection.getLatestBlockhash({
          commitment: options.preflightCommitment,
          minContextSlot: options.minContextSlot,
        })
      ).blockhash;

    return transaction;
  }
}

interface WalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
  accountChanged(newPublicKey: PublicKey): unknown;
  error(error: any): void;
  readyStateChange(readyState: WalletReadyState): void;
}

export interface Wallet extends EventEmitter<WalletEvents> {
  publicKey?: { toBytes(): Uint8Array };
  isConnected: boolean;
  signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
  signAndSendTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
    options?: SendOptions
  ): Promise<{ signature: TransactionSignature }>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export class BaseAdapter extends Adapter {
  supportedTransactionVersions?: SupportedTransactionVersions;
  connect(): Promise<void> {
      throw new Error('Method not implemented.');
  }

  name: string = '';
  url: string = '';
  icon: string = '';
  private _connecting: boolean;
  private _wallet: Wallet | null;
  private _publicKey: PublicKey | null;
  private _readyState: WalletReadyState =
    typeof window === 'undefined' || typeof document === 'undefined'
      ? WalletReadyState.Unsupported : WalletReadyState.NotDetected;

  constructor() {
    super();
    this._connecting = false;
    this._wallet = null
    this._publicKey = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      if (isIosAndRedirectable()) {
        this._readyState = WalletReadyState.Loadable;
        this.emit('readyStateChange', this._readyState);
      }
    }
  }

  get wallet() {
    return this._wallet;
  }

  set wallet(w) {
    this._wallet = w;
  }

  get publicKey() {
    return this._publicKey;
  }

  set publicKey(key) {
    this._publicKey = key;
  }

  get connecting() {
    return this._connecting;
  }

  set connecting(value: boolean) {
    this._connecting = value;
  }

  get readyState() {
    return this._readyState;
  }

  protected async prepareTransaction(
    transaction: Transaction,
    connection: Connection,
    options: SendOptions = {}
  ): Promise<Transaction> {
    const publicKey = this.publicKey;
    if (!publicKey) throw new Error('wallet not connected');

    transaction.feePayer = transaction.feePayer || publicKey;
    transaction.recentBlockhash =
      transaction.recentBlockhash ||
      (
        await connection.getLatestBlockhash({
          commitment: options.preflightCommitment,
          minContextSlot: options.minContextSlot,
        })
      ).blockhash;

    return transaction;
  }

  async sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options: SendTransactionOptions): Promise<TransactionSignature> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new Error('wallet not connected');

      try {
        const {signers, ...sendOptions} = options;

        if (isVersionedTransaction(transaction)) {
          signers?.length && transaction.sign(signers);
        } else {
          transaction = (await this.prepareTransaction(transaction, connection, sendOptions)) as T;
          signers?.length && (transaction as Transaction).partialSign(...signers);
        }

        sendOptions.preflightCommitment = sendOptions.preflightCommitment || connection.commitment;

        const {signature} = await wallet.signAndSendTransaction(transaction, sendOptions);
        return signature;
      } catch (error: any) {
        throw error;
      }
    } catch (error: any) {
      this.emit('error', error);
      throw error;
    }
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new Error('wallet not connected');
      try {
        return (await wallet.signTransaction(transaction)) || transaction;
      } catch (error: any) {
        throw error;
      }
    } catch (error: any) {
      this.emit('error', error);
      throw error;
    }
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new Error('wallet not connected');
      try {
        return (await wallet.signAllTransactions(transactions)) || transactions;
      } catch (error: any) {
        throw error;
      }
    } catch (error: any) {
      this.emit('error', error);
      throw error;
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new Error('not found wallet');

      try {
        const {signature} =  await wallet.signMessage(message);
        return signature;
      } catch (error: any) {
        throw error;
      }
    } catch (error: any) {
      this.emit('error', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    const wallet = this._wallet;
    if (wallet) {
      this._wallet = null;
      this._publicKey = null;
    }
    try {
      await wallet?.disconnect();
    } catch (error: any) {
      this.emit('error', error);
    }

    this.emit('disconnect');
  }

  _disconnected = () => {
    const wallet = this._wallet;
    if (wallet) {
      wallet.off('disconnect', this._disconnected);
      wallet.off('accountChanged', this._accountChanged);

      this._wallet = null;
      this._publicKey = null;

      this.emit('disconnect');
    }
  }

  _accountChanged = (newPublicKey: PublicKey) => {
    const publicKey = this._publicKey;
    if (!publicKey) return;

    try {
      newPublicKey = new PublicKey(newPublicKey.toBytes());
    } catch(error: any) {
      this.emit('error', error);
      return;
    }
    if (publicKey.equals(newPublicKey)) return;

    this._publicKey = newPublicKey;
    this.emit('connect', newPublicKey);
  }
}
