'use client';
import type {PublicKey} from '@solana/web3.js';
import {createContext, useContext} from 'react';
import {Adapter} from './adapters/BaseAdapter';

export interface WalletContextState {
  wallets: Adapter[];
  wallet: Adapter | null;
  publicKey: PublicKey | null;
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  select: (name: string) => Promise<void>;
  connect: (name: string) => Promise<void>;
  signMessage: (name: string) => Promise<Record<string, any> | null>;
}

export const WalletContext = createContext<WalletContextState>({
  publicKey: null,
  wallet: null,
  wallets: [],
  connected: false,
  connecting: false,
  disconnecting: false,
  select: async () => {},
  connect: async () => {},
  signMessage: async () => null,
});

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
