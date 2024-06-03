import {BN} from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';
import {Big} from 'big.js';

export function formatAccountInfo(obj: any, key: string) {
  if (obj[key] instanceof BN) {
    return Big(obj[key].toString()).div(1_000_000_000).toNumber();
  }
  if (obj[key] instanceof PublicKey) {
    return obj[key].toBase58();
  }
  return obj[key];
}
