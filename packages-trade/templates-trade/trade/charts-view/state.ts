import {useContract} from '@/trade/hooks/contract';
import {contractInfo$, lastInfo$} from '@/trade/streams/streams';
import {lang as tradeLang} from '@rx/lang/trade.lang';
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

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (contract && maturity) {
        const json = await mockData[contract][maturity]?.();
        const newData = (json?.default ?? []).filter((d: any) => d.time <= new Date().getTime());
        if (newData && newData.length > 0) {
          setData(newData);
          contractInfo$.next(newData[newData.length - 1]);
          lastInfo$.next(newData[newData.length - 1]);
        }
      }
    })();
  }, [contract, maturity]);
  return {data};
};

export const genChartTypes = (LG: Function) => [
  {text: LG(tradeLang.Candle), value: 'Candle'},
  {text: LG(tradeLang.Line), value: 'Line'},
];

export const chainToContract: Record<string, any> = {
  SOL: {
    mSOL: ['2403', '2406', '2412', '2506', '2512'],
    JitoSOL: ['2403', '2406', '2412', '2506', '2512'],
  },
};

export const mockData: Record<string, any> = {
  mSOL: {
    '2403': () => import('../mock/MSol-20250630.json'),
    '2406': () => import('../mock/MSol-20250630.json'),
    '2412': () => import('../mock/MSol-20250630.json'),
    '2506': () => import('../mock/MSol-20250630.json'),
    '2512': () => import('../mock/MSol-20250630.json'),
  },
  JitoSOL: {
    '2403': () => import('../mock/MSol-20250630.json'),
    '2406': () => import('../mock/MSol-20250630.json'),
    '2412': () => import('../mock/MSol-20250630.json'),
    '2506': () => import('../mock/MSol-20250630.json'),
    '2512': () => import('../mock/MSol-20250630.json'),
  },
};
