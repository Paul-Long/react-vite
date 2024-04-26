import {ILiquidityPosition, LiquidityPositionLayout} from '@/sdk/layout/liquidity-position-layout';
import {IMarginPosition, MarginPositionLayout} from '@/sdk/layout/margin-position-layout';
import {IOrder, OrderLayout} from '@/sdk/layout/order-layout';
import {IPerpPosition, PerpPositionLayout} from '@/sdk/layout/perp-position-layout';
import {blob, nu64, seq, struct, u16} from '@solana/buffer-layout';
import {bool, publicKey} from '@solana/buffer-layout-utils';

import {PublicKey} from '@solana/web3.js';

export interface IUser {
  authority: PublicKey;
  is_isolated: boolean;
  is_trader: boolean;
  sub_account_id: number;
  margin_positions: IMarginPosition[];
  liquidity_positions: ILiquidityPosition[];
  perp_positions: IPerpPosition[];
  orders: IOrder[];
  last_active_slot: bigint;
  idle: boolean;
  is_liquidated: boolean;
  padding: Uint8Array; // 21 字节的填充
}

export const UserLayout = struct<IUser>([
  publicKey('authority') as any,
  bool('is_isolated'),
  bool('is_trader'),
  u16('sub_account_id'),
  seq(MarginPositionLayout, 8, 'margin_positions'),
  seq(LiquidityPositionLayout, 8, 'liquidity_positions'),
  seq(PerpPositionLayout, 8, 'perp_positions'),
  seq(OrderLayout, 32, 'orders'),
  nu64('last_active_slot'),
  bool('idle'),
  bool('is_liquidated'),
  blob(21, 'padding'),
]);
