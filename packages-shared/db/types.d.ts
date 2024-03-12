export interface Position {
  id: string;
  Contract: string;
  marginType: string;
  mode: string;
  direction: string;
  orderType: string;
  amount: string;
  leverage: string;
  maxLeverage: string;
  depositMargin: string;
  balance: string;
  slippageTolerance: string;
  pay: string;
  rec: string;
  estimatedTrade: string;
  impact: string;
  liquidation: string;
  estimatedTradingFee: string;
  executionFee: string;
  pnl: string;
  entry: string;
  current: string;
  liq: string;
  tpsl: string;
  cr: string;
  transaction: string;
}

export interface ClosePosition {
  id: string;
  Contract: string;
  marginType: string;
  mode: string;
  direction: string;
  orderType: string;
  amount: string;
  leverage: string;
  maxLeverage: string;
  depositMargin: string;
  balance: string;
  slippageTolerance: string;
  pay: string;
  rec: string;
  estimatedTrade: string;
  impact: string;
  liquidation: string;
  estimatedTradingFee: string;
  executionFee: string;
  pnl: string;
  entry: string;
  current: string;
  liq: string;
  tpsl: string;
  cr: string;
  transaction: number;
}

export interface StrategyEarnPosition {
  token: string;
  apr: string;
  ttm: string;
  matureDate: string;
  underlying: string;
  amount: string;
}

export interface StrategySyntheticAsset {
  UnderlyingAsset: string;
  MaturityDate: string;
  RWAToken: string;
  TTM: string;
  APR: string;
  Amount: string;
}

export interface StrategyCarryTrade {
  Underlying: string;
  LongContract: string;
  LongRate: string;
  LongTTM: string;
  ShortContract: string;
  ShortRate: string;
  ShortTTM: string;
  APR: string;
  Amount: string;
  MaturityDate: string;
  PrincipalToken: string;
}

export interface LpPosition {
  Contract: string;
  MaturityDate: string;
  TTM: string;
  APR: string;
  TVL: string;
  ActiveRatio: string;
  RLPValue: string;
  Currency: string;
  EarnedFees: string;
  FeeCurrency: string;
  AwardedRTX: string;
  Range: string;
  LockedValue: string;
  Asset: string;
  Obligation: string;
  Collateral: string;
  WithdrawableValue: string;
}
