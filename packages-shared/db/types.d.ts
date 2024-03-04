export interface Position {
  margin: string;
  direction: string;
  orderType: string;
  qtyType: string;
  size: string | number;
  leverage: number;
  marginCost: number;
  marginCross: string;
  entryPrice: number;
  liqPrice: number;
  marketPrice: number;
  netValue: number;
  maxLeverage: number;
  initialMarginRate: number;
  maintenanceMarginRate: string;
  referenceApr: string;
  yield: string;
}

export interface ClosePosition {
  margin: string;
  direction: string;
  orderType: string;
  qtyType: string;
  size: string | number;
  leverage: number;
  marginCost: number;
  marginCross: string;
  entryPrice: number;
  liqPrice: number;
  marketPrice: number;
  netValue: number;
  maxLeverage: number;
  initialMarginRate: number;
  maintenanceMarginRate: string;
  referenceApr: string;
  yield: string;
}
