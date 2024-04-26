import {ns64, nu64, struct, u16} from '@solana/buffer-layout';

export interface IPerpPosition {
  base_asset_amount: bigint;
  quote_asset_amount: bigint;
  last_rate: bigint;
  market_index: number;
}

export const PerpPositionLayout = struct<IPerpPosition>([
  ns64('base_asset_amount'),
  ns64('quote_asset_amount'),
  nu64('last_rate'),
  u16('market_index'),
]);
