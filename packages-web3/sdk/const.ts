export class OrderType {
  static readonly LIMIT = {limit: {}};
  static readonly MARKET = {market: {}};
}

export class PositionDirection {
  static readonly LONG = {long: {}};
  static readonly SHORT = {short: {}};
}

export const DRIFT_PROGRAM_ID = '8TKWgQoBphGT5bRRnyTpNUzKhUTCRf1tKN8wcfdbAMfA';

export enum ProgramAccountType {
  User = 'user',
  SpotMarketVault = 'spot_market_vault',
}
