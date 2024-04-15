import {useObservable} from '@rx/hooks/use-observable';
import {contractMap$} from '@rx/streams/config';
import {useCallback, useEffect, useMemo, useState} from 'react';

export const AssetsMap: Record<string, string[]> = {
  ALL: [],
  SOL: ['SOLStaking', 'mSOL', 'JitoSOL'],
  ETH: ['ETHStaking', 'stETH', 'rETH'],
  LRT: ['eETH', 'pufETH'],
  Points: ['EigenLayer', 'Blast', 'Merlin', 'BounceBit'],
  'LP Token': ['BONK-SOL(Orca)', 'WIF-SOL(Orca)'],
  NFT: ['BAYC', 'Mad Lads'],
  Stables: ['USDY', 'aUSDC'],
  RWA: ['Uscpi'],
};

export const Assets: string[] = [
  'SOL',
  'ETH',
  'LRT',
  'Points',
  'LP Token',
  'NFT',
  'Stables',
  'RWA',
];

export interface FiltersProps {
  onChange?: Function;
}

export function useFilters(props: FiltersProps) {
  const contractMap = useObservable(contractMap$, {});
  const [asset, setAsset] = useState<string>('SOL');

  const baseContracts = useMemo(() => {
    return AssetsMap[asset];
  }, [asset, contractMap]);

  const [contracts, setContracts] = useState<string[]>(['ALL']);

  useEffect(() => {
    props?.onChange?.({assets: [asset], contracts});
  }, [asset, contracts]);

  const handleAssetsChecked = useCallback(
    (c: string) => {
      return function (checked: boolean) {
        setAsset((prevState) => {
          if (checked) {
            setContracts(() => {
              return ['ALL'];
            });
            return c;
          }
          return prevState;
        });
      };
    },
    [asset]
  );

  const handleContractsChecked = useCallback(
    (c: string) => {
      return function (checked: boolean) {
        setContracts((prevState) => {
          let filters: string[] = prevState.filter((a) => a !== c && a !== 'ALL');
          if (checked) {
            filters = c === 'ALL' ? ['ALL'] : [...filters, c];
          }
          // const isAll = !baseContracts.some((a) => !filters.includes(a));
          if (filters.length === 0) {
            filters = ['ALL'];
          }
          return filters;
        });
      };
    },
    [contracts, baseContracts]
  );

  return {asset, contracts, baseContracts, handleAssetsChecked, handleContractsChecked};
}

export const MinMap: any = {
  SOLStaking: 116,
  ETHStaking: 116,
  EigenLayer: 116,
};
