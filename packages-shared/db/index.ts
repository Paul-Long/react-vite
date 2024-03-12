import {ClosePositionsFields} from '@/close-positions';
import {LpPositionFields} from '@/lp-position';
import {PositionsFields} from '@/positions';
import {StrategyCarryTradeFields} from '@/strategy-carry-trade';
import {StrategyEarnFields} from '@/strategy-earn';
import {StrategySyntheticAssetFields} from '@/strategy-synthetic-asset';
import Dexie, {Table} from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';
import type {
  LpPosition,
  Position,
  StrategyCarryTrade,
  StrategyEarnPosition,
  StrategySyntheticAsset,
} from './types';

export class MySubClassedDexie extends Dexie {
  positions: Table<Position>;
  closePositions: Table<Position>;
  strategyEarnPosition: Table<StrategyEarnPosition>;
  strategySyntheticAsset: Table<StrategySyntheticAsset>;
  strategyCarryTrade: Table<StrategyCarryTrade>;
  lpLivePosition: Table<LpPosition>;
  lpResidualPosition: Table<LpPosition>;

  constructor() {
    super('rate-x');
    this.version(1).stores({
      positions: PositionsFields,
      closePositions: ClosePositionsFields,
      strategyEarnPosition: StrategyEarnFields,
      strategySyntheticAsset: StrategySyntheticAssetFields,
      strategyCarryTrade: StrategyCarryTradeFields,
      lpLivePosition: LpPositionFields,
      lpResidualPosition: LpPositionFields,
    });
    this.positions = this.table('positions');
    this.closePositions = this.table('closePositions');
    this.strategyEarnPosition = this.table('strategyEarnPosition');
    this.strategySyntheticAsset = this.table('strategySyntheticAsset');
    this.strategyCarryTrade = this.table('strategyCarryTrade');
    this.lpLivePosition = this.table('lpLivePosition');
    this.lpResidualPosition = this.table('lpResidualPosition');
  }
}

export const db = new MySubClassedDexie();

export function useQuery<T>(callback: any) {
  return useLiveQuery<T>(callback);
}
