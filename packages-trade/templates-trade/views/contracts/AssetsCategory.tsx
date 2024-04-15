import {StyledWrap} from '@/views/contracts/styles';
import {useObservable} from '@rx/hooks/use-observable';
import {assets$, contractMap$, maturityMap$} from '@rx/streams/config';
import {ttmMap$} from '@rx/streams/epoch';
import {Select} from '@rx/widgets';
import {useEffect, useMemo, useState} from 'react';

export function AssetsCategory() {
  const assets = useObservable(assets$, []);
  const contractMap = useObservable<Record<string, ConfigCategory[]>>(contractMap$, {});
  const maturityMap = useObservable<Record<string, ConfigSymbol[]>>(maturityMap$, {});
  const ttmMap = useObservable<Record<string, any>>(ttmMap$, {});
  const [asset, setAsset] = useState<string>();
  const [contract, setContract] = useState<string>();
  const [maturity, setMaturity] = useState<string>();

  const contracts = useMemo(() => {
    return contractMap?.[asset as any] ?? [];
  }, [asset]);
  const maturities = useMemo(() => {
    return maturityMap?.[[asset, contract].join('-')] ?? [];
  }, [asset, contract]);
  const TTM = useMemo(() => {
    return ttmMap?.[[asset, contract, maturity].join('_')];
  }, [asset, contract, maturity, ttmMap]);

  useEffect(() => {
    if (!asset && assets?.length > 0) {
      setAsset(assets[0].symbolCategory as string);
    }
  }, [asset, assets]);
  useEffect(() => {
    if (!contract && contracts?.length > 0) {
      setContract(contracts[0].symbolCategory);
    }
  }, [contract, contracts]);
  useEffect(() => {
    if (!maturity && maturities.length > 0) {
      setMaturity(maturities[0].term);
    }
  }, [maturity, maturities]);

  return (
    <StyledWrap className="df fdr aic gap24px">
      <Select
        className="f1"
        value={asset}
        options={assets.map((a) => ({label: a.symbolCategory, value: a.symbolCategory}))}
        onChange={(v) => setAsset(v)}
      />
      <Select
        className="f1"
        value={contract}
        options={contracts?.map((c: ConfigCategory) => ({
          label: c.symbolCategory,
          value: c.symbolCategory,
        }))}
        onChange={(v) => setContract(v)}
      />
      <Select
        className="f1"
        value={maturity}
        options={maturities?.map((m: ConfigSymbol) => ({label: m.term, value: m.term}))}
        onChange={(v) => setMaturity(v)}
      />
      <div className="f1 text-nowrap">
        TTM: {TTM?.ttm} {TTM?.unit}
      </div>
    </StyledWrap>
  );
}
