import {useCallback, useEffect, useMemo, useState} from 'react';

export const AssetsMap: Record<string, string[]> = {
  ALL: [],
  SOL: ['SOLStaking', 'mSOL', 'JitoSOL'],
  ETH: ['ETHStaking', 'stETH', 'rETH'],
  LRT: ['eETH', 'pufETH'],
  Stables: ['USDY', 'aUSDC'],
  RWA: ['Uscpi'],
};

export const Assets: string[] = ['SOL', 'ETH', 'LRT', 'Stables', 'RWA'];

export interface FiltersProps {
  onChange?: Function;
}

export function useFilters(props: FiltersProps) {
  const [assets, setAssets] = useState<string[]>(['ALL', ...Assets]);

  const baseContracts = useMemo(() => {
    const selectedAssets = assets.includes('ALL') ? Object.keys(AssetsMap) : assets;
    return selectedAssets.reduce((arr: string[], key: string) => [...arr, ...AssetsMap[key]], []);
  }, [assets]);

  const [contracts, setContracts] = useState<string[]>(['ALL', ...baseContracts]);

  useEffect(() => {
    props?.onChange?.({assets, contracts});
  }, [assets, contracts]);

  const handleAssetsChecked = useCallback(
    (c: string) => {
      return function (checked: boolean) {
        setAssets((prevState) => {
          let filters: string[] = prevState.filter((a) => a !== c && a !== 'ALL');
          if (checked) {
            filters = c === 'ALL' ? ['ALL', ...Assets] : [...filters, c];
          }
          // const isAll = !Assets.some((a) => !filters.includes(a));
          if (filters.length === 0) {
            filters = ['ALL', ...Assets];
            setContracts(['ALL', ...baseContracts]);
          }
          return filters;
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
            filters = c === 'ALL' ? ['ALL', ...baseContracts] : [...filters, c];
          }
          // const isAll = !baseContracts.some((a) => !filters.includes(a));
          if (filters.length === 0) {
            filters = ['ALL', ...baseContracts];
          }
          return filters;
        });
      };
    },
    [contracts, baseContracts]
  );

  return {assets, contracts, baseContracts, handleAssetsChecked, handleContractsChecked};
}
