import {BN, Wallet} from '@coral-xyz/anchor';
import type {ConfirmOptions, Connection, PublicKey} from '@solana/web3.js';

export type RateXClientConfig = {
  connection: Connection;
  programID?: PublicKey;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
};

interface RateXPosition {
  userPda: string;
  baseAssetAmount: BN | number;
  lastRate?: BN | number;
  marketIndex: number;
  quoteAssetAmount: BN | number;
}

interface RateXOrder {
  userPda: string;
  orderId: number;
  baseAssetAmount: BN | number;
  lastRate?: BN | number;
  marketIndex: number;
  quoteAssetAmount: BN | number;
}

type MarginType = 'CROSS' | 'ISOLATED';
type OrderType = 'MARKET' | 'LIMIT';
type DirectionType = 'LONG' | 'SHORT';

interface RateXPlaceOrderParams {
  marginType: MarginType;
  amount: number;
  marketIndex: number;
  orderType: OrderType;
  direction: DirectionType;
  isClose: boolean;
  margin?: number;
  openTip?: () => void;
}

interface RateXClosePositionParams {
  marginType: MarginType;
  amount: number;
  marketIndex: number;
  orderType: OrderType;
  direction: DirectionType;
  margin?: number;
  userPda: string;
  userOrdersPda: string;
}
