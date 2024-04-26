import {blob, nu64, struct, u16} from '@solana/buffer-layout';

export interface IMarginPosition {
  scaled_balance: bigint;
  balance: bigint;
  market_index: number;
  padding: Uint8Array;
}

export const MarginPositionLayout = struct<IMarginPosition>([
  nu64('scaled_balance'),
  nu64('balance'),
  u16('market_index'),
  blob(4, 'padding'),
]);
