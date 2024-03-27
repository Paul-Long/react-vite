import {asset$, contract$, maturity$} from '@/streams/streams';
import {useStream} from '@rx/hooks/use-stream';
import {useEffect, useState} from 'react';

type Option = {label: string; value: string};

export function useContract() {
  const [asset, setAsset] = useStream(asset$);
  const [contract, setContract] = useStream(contract$);
  const [maturity, setMaturity] = useStream(maturity$);
  const [contracts, setContracts] = useState<Option[]>([]);
  const [maturities, setMaturities] = useState<Option[]>([]);

  useEffect(() => {
    if (!asset) {
      return;
    }
    const data = AssetsToContracts[asset];
    const contractList = Object.keys(data).map((d) => ({label: d, value: d}));
    const first = contractList[0].value;
    const mFirst = data[first][0];
    const cs: any[] = Object.keys(data).map((d: string) => ({label: d, value: d}));
    setContracts(cs);
    setMaturities(data[first]?.map((o: string) => ({label: o, value: o})));
    setContract(first);
    setMaturity(mFirst);
  }, [asset]);

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
