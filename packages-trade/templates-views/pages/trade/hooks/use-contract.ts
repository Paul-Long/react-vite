import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {contractMap$, maturityMap$} from '@rx/streams/config';
import {useEffect, useState} from 'react';
import {asset$, contract$, maturity$} from '../streams/streams';

type Option = {label: string; value: string};

export function useContract() {
  const [asset, setAsset] = useStream(asset$);
  const [contract, setContract] = useStream(contract$);
  const [maturity, setMaturity] = useStream(maturity$);
  const contractMap = useObservable(contractMap$, {});
  const maturityMap = useObservable(maturityMap$, {});
  const [contracts, setContracts] = useState<Option[]>([]);
  const [maturities, setMaturities] = useState<Option[]>([]);

  useEffect(() => {
    if (!asset) {
      return;
    }
    const data = contractMap?.[asset];
    const contractList = data?.map((d) => ({label: d.symbolCategory, value: d.symbolCategory}));
    const contract = data?.[0]?.symbolCategory;
    setContract(contract);
    setContracts(contractList);
  }, [asset, contractMap]);

  useEffect(() => {
    if (!asset || !contract) {
      return;
    }
    const maturityList = maturityMap[asset + '-' + contract];
    const maturityOptions: any[] = maturityList.map((d) => ({label: d.term, value: d.term}));
    setMaturity(maturityList[0].term);
    setMaturities(maturityOptions);
  }, [asset, contract, contractMap, maturityMap]);

  return {
    asset,
    contract,
    maturity,
    setAsset,
    setContract,
    setMaturity,
    contracts,
    maturities,
  };
}

export const AssetsToContracts: Record<string, any> = {
  SOL: {
    mSOL: ['2403', '2406', '2412', '2506', '2512'],
    JitoSOL: ['2403', '2406', '2412', '2506', '2512'],
  },
  ETH: {
    stETH: ['2403', '2406', '2412', '2506', '2512'],
    rETH: ['2403', '2406', '2412', '2506', '2512'],
  },
  LRT: {
    eETH: ['2403', '2406', '2412', '2506', '2512'],
    pufETH: ['2403', '2406', '2412', '2506', '2512'],
  },
  Points: {
    EigenLayer: ['2403', '2406', '2412', '2506', '2512'],
    Blast: ['2403', '2406', '2412', '2506', '2512'],
    Merlin: ['2403', '2406', '2412', '2506', '2512'],
    BounceBit: ['2403', '2406', '2412', '2506', '2512'],
  },
  NFT: {
    BAYC: ['2403', '2406', '2412', '2506', '2512'],
    'Mad Lads': ['2403', '2406', '2412', '2506', '2512'],
  },
  'LP Token': {
    'BONK-SOL(Orce)': ['2403', '2406', '2412', '2506', '2512'],
    'WIF-SOL(Orce)': ['2403', '2406', '2412', '2506', '2512'],
  },
  Stables: {
    USDY: ['2403', '2406', '2412', '2506', '2512'],
    aUSDC: ['2403', '2406', '2412', '2506', '2512'],
  },
  RWA: {
    Uscpi: ['2403', '2406', '2412', '2506', '2512'],
  },
};
