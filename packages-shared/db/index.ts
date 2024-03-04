import {ClosePositionsFields} from '@/close-positions';
import {PositionsFields} from '@/positions';
import Dexie, {Table} from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';
import type {Position} from './types';

export class MySubClassedDexie extends Dexie {
  positions: Table<Position>;
  closePositions: Table<Position>;

  constructor() {
    super('rate-x');
    this.version(1).stores({
      positions: PositionsFields,
      closePositions: ClosePositionsFields,
    });
    this.positions = this.table('positions');
    this.closePositions = this.table('closePositions');
  }
}

export const db = new MySubClassedDexie();

export function useQuery<T>(callback: any) {
  return useLiveQuery<T>(callback);
}
