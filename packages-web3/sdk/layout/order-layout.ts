import {blob, ns64, nu64, struct, u16, u32, u8} from '@solana/buffer-layout';
import {u128} from '@solana/buffer-layout-utils';

export interface IOrder {
  slot: bigint;
  price_limit: bigint;
  base_asset_amount: bigint;
  base_asset_amount_filled: bigint;
  quote_asset_amount_filled: bigint;
  expire_ts: bigint;
  order_id: number;
  status: number;
  order_type: number;
  market_index: number;
  padding: Uint8Array;
}

export const OrderLayout = struct<IOrder>([
  nu64('slot'),
  u128('price_limit'),
  ns64('base_asset_amount'),
  ns64('base_asset_amount_filled'),
  ns64('quote_asset_amount_filled'),
  ns64('expire_ts'),
  u32('order_id'),
  u8('status'),
  u8('order_type'),
  u16('market_index'),
  blob(20, 'padding'),
]);
