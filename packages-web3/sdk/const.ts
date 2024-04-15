import {PublicKey} from '@solana/web3.js';

export class OrderType {
  static readonly LIMIT = {limit: {}};
  static readonly MARKET = {market: {}};
}

export class PositionDirection {
  static readonly LONG = {long: {}};
  static readonly SHORT = {short: {}};
}

export const RATE_X_PROGRAM_ID = '8k3ZaRdNcy65YJPHymfE2ux77odEEso9AWQAy3WPiDN3';
export const TOKE_FAUCET_PROGRAM_ID = 'H4BAr6qPHqD9oGvdxF7HQXsFVEH4AZC3Z3eyick32knt';

export const MINT_ACCOUNT = new PublicKey('9aWhnNWXVypCGoVN75DUBaq1N95bbFvgTsEuuyC6s16t');
export const ORACLE_PDA = new PublicKey('5hFTfAerVYr3MbrzAeQeVjDykGm8uSfpq6Ra2uX1KPXX');
export const MARGIN_MARKET_PDA = new PublicKey('Fw74J2ht5rdbx49aoX5bHWEYxPnQ4Q8mBeeBC8ajPg4q');
export const MARGIN_MARKET_VAULT_PDA = new PublicKey(
  'GeaMYuk4o8hN5YejZK6QKNNrBapEKjUHR991jnRSPhMP'
);
export const STATE_PDA = new PublicKey('DhZ2YrTHcVU9nAUbkTztcEMyWbMepfox2HPScV6L3pcv');
export const SIGNER_PDA = new PublicKey('BujSYu3XKKFYDkbniKSUT4w7Jb2sFXtiV3mYj3mmbqyP');
export const INSURANCE_FUND_VAULT_PDA = new PublicKey(
  '342wCgPtEt928y2iKXNmMREAAUHZzWSWQ732V4vdpQSH'
);
export const FAUCET_CONFIG_PDA = new PublicKey('occrDyFXiXBeEEFyp5PwAETN3HELCZ5UTZu7T1NBQUh');
export const MINT_AUTHORITY = new PublicKey('37GJsqvFMm7pEpJ7JiT8LWeaBNqdRAgLPkVGHBRdqxYR');

export enum ProgramAccountType {
  User = 'user',
  SpotMarketVault = 'spot_market_vault',
  MarginMarket = 'margin_market',
  MarginMarketVault = 'margin_market_vault',
  InsuranceFundVault = 'insurance_fund_vault',
  DriftSigner = 'drift_signer',
  DriftState = 'drift_state',
  DriftOracle = 'drift_oracle',
}
