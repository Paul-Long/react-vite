import {IMAGES} from '@/pages/lp/const';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {contractMap$, maturityMap$} from '@rx/streams/config';
import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {asset$, contract$, maturity$} from '../streams/streams';

type Option = {label: ReactNode; value: string};

export function useContract() {
  const [asset, setAsset] = useStream(asset$);
  const [contract, setContract] = useStream(contract$);
  const [maturity, setMaturity] = useStream(maturity$);
  const contractMap = useObservable(contractMap$, {});
  const maturityMap = useObservable(maturityMap$, {});
  const [contracts, setContracts] = useState<Option[]>([]);
  const [maturities, setMaturities] = useState<Option[]>([]);

  const baseContract = useMemo<any>(() => {
    if (!asset || !contract) {
      return;
    }
    const maturityList = maturityMap[asset + '-' + contract];
    return maturityList?.find((m) => m.term === maturity);
  }, [asset, contract, maturity, maturityMap]);

  useEffect(() => {
    if (!asset) {
      return;
    }
    const data = contractMap?.[asset];
    const Label = ({d}: {d: ConfigCategory}) => (
      <div className="flex flex-row items-center gap-8px">
        <img src={IMAGES[d.symbolCategory.toUpperCase()]} alt="" width={24} height={24} />
        {d.symbolCategory}
      </div>
    );
    const contractList = data?.map((d) => ({label: <Label d={d} />, value: d.symbolCategory}));
    const contract = data?.[0]?.symbolCategory;
    setContract(contract);
    setContracts(contractList);
  }, [asset, contractMap]);

  useEffect(() => {
    if (!asset || !contract) {
      return;
    }
    const maturityList = maturityMap[asset + '-' + contract];
    const maturityOptions: any[] = maturityList?.map((d) => ({label: d.term, value: d.term}));
    setMaturity(maturityList?.[0]?.term);
    setMaturities(maturityOptions);
  }, [asset, contract, contractMap, maturityMap]);

  useEffect(() => {
    if (contract && maturity) {
      // queryKLine$.next({securityID: [contract, maturity].join('-')});
      // kline$.next(`dc.md.kline.1M.${[contract, maturity].join('-')}`);
    }
  }, [contract, maturity]);

  const getContract = useCallback(() => {
    if (!asset || !contract) {
      return;
    }
    const maturityList = maturityMap[asset + '-' + contract];
    return maturityList?.find((m) => m.term === maturity);
  }, [asset, contract, maturity, maturityMap]);

  return {
    asset,
    contract,
    maturity,
    setAsset,
    setContract,
    setMaturity,
    contracts,
    maturities,
    getContract,
    baseContract,
  };
}