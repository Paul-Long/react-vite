import {IMAGES} from '@/pages/lp/const';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {contractMap$, maturityMap$} from '@rx/streams/config';
import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {asset$, contract$, maturity$} from '../streams/streams';

type Option = {label: ReactNode; value: string};

export function useContract() {
  const params = useParams();
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
    setContracts(contractList);
    if (params.contract && !!data) {
      const [p1, p2] = params.contract.split('-');
      const c = data.find((d) => d.symbolCategory?.toLowerCase() === p1?.toLowerCase());
      if (c) {
        setContract(c.symbolCategory);
        return;
      }
    }
    const contract = data?.[0]?.symbolCategory;
    setContract(contract);
  }, [asset, contractMap, params]);

  useEffect(() => {
    if (!asset || !contract) {
      return;
    }
    const maturityList = maturityMap[asset + '-' + contract];
    const maturityOptions: any[] = maturityList?.map((d) => ({label: d.term, value: d.term}));
    setMaturities(maturityOptions);
    if (params.contract) {
      const [p1, p2] = params.contract.split('-');
      if (p2) {
        const m = maturityList?.find((m) => m.term?.toLowerCase() === p2?.toLowerCase());
        if (m) {
          setMaturity(m.term);
          return;
        }
      }
    }
    setMaturity(maturityList?.[0]?.term);
  }, [asset, contract, contractMap, maturityMap, params]);

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
