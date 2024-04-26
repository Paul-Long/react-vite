import {s32, struct, u16} from '@solana/buffer-layout';
import {u128} from '@solana/buffer-layout-utils';

export interface ILiquidityPosition {
  liquidity_amount: bigint;
  tick_lower_index: number;
  tick_upper_index: number;
  market_index: number;
}

export const LiquidityPositionLayout = struct<ILiquidityPosition>([
  u128('liquidity_amount'),
  s32('tick_lower_index'),
  s32('tick_upper_index'),
  u16('market_index'),
]);
