import {useContract} from '@/trade/hooks/contract';
import {useEffect, useState} from 'react';

export const useChartsState = () => {
  const {chain, contract, setContract, maturity, setMaturity} = useContract();
  const [contracts, setContracts] = useState<any[]>([]);
  const [maturities, setMaturities] = useState([]);

  useEffect(() => {
    const data = chainToContract[chain];
    const contractList = Object.keys(data).map((d) => ({label: d, value: d}));
    const first = contractList[0].value;
    const mFirst = data[first][0];
    const cs: any[] = Object.keys(data).map((d: string) => ({label: d, value: d}));
    setContracts(cs);
    setMaturities(data[first]?.map((o: string) => ({label: o, value: o})));
    setContract(first);
    setMaturity(mFirst);
  }, [chain]);

  return {contract, contracts, setContract, maturity, setMaturity, maturities};
};

export const useChartData = () => {
  const {contract, maturity} = useContract();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (contract && maturity) {
        const json = await mockData[contract]?.[maturity]?.();
        const newData = json?.default ?? [];
        setData(newData);
      }
    })();
  }, [contract, maturity]);
  return {data};
};

export const chainToContract: Record<string, any> = {
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
  Stables: {
    USDY: ['2403', '2406', '2412', '2506', '2512'],
    aUSDC: ['2403', '2406', '2412', '2506', '2512'],
  },
  RWA: {
    Uscpi: ['2403', '2406', '2412', '2506', '2512'],
  },
};

export const mockData: Record<string, any> = {
  mSOL: {
    2403: () => import('../mock/trade/mSOL-2403.json'),
    2406: () => import('../mock/trade/mSOL-2406.json'),
    2412: () => import('../mock/trade/mSOL-2412.json'),
    2506: () => import('../mock/trade/mSOL-2506.json'),
    2512: () => import('../mock/trade/mSOL-2512.json'),
  },
  JitoSOL: {
    2403: () => import('../mock/trade/JitoSOL-2403.json'),
    2406: () => import('../mock/trade/JitoSOL-2406.json'),
    2412: () => import('../mock/trade/JitoSOL-2412.json'),
    2506: () => import('../mock/trade/JitoSOL-2506.json'),
    2512: () => import('../mock/trade/JitoSOL-2512.json'),
  },
};
