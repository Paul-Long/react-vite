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
  const [assets, setAssets] = useState<string[]>(['SOL']);

  const baseContracts = useMemo(() => {
    const selectedAssets = assets.includes('ALL') ? Object.keys(AssetsMap) : assets;
    return selectedAssets.reduce((arr: string[], key: string) => [...arr, ...AssetsMap[key]], []);
  }, [assets]);

  const [contracts, setContracts] = useState<string[]>(['ALL']);

  useEffect(() => {
    props?.onChange?.({assets, contracts});
  }, [assets, contracts]);

  const handleAssetsChecked = useCallback(
    (c: string) => {
      return function (checked: boolean) {
        setAssets((prevState) => {
          if (checked) {
            setContracts(() => {
              return ['ALL'];
            });
            return [c];
          }
          return prevState;
        });
      };
    },
    [assets]
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

  return {assets, contracts, baseContracts, handleAssetsChecked, handleContractsChecked};
}

export const MinMap: any = {
  SOLStaking: 116,
  ETHStaking: 116,
  EigenLayer: 116,
};
