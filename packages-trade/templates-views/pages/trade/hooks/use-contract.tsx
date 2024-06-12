import {IMAGES} from '@/pages/lp/const';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {contracts$, maturityMap$} from '@rx/streams/config';
import {recentTrades$} from '@rx/streams/subscription/recent-trades';
import {queryRecentTrades$} from '@rx/streams/trade/recent-trades';
import {useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {asset$, contract$, maturity$} from '../streams/streams';

export function useContract() {
  const params = useParams();
  const {fixLink} = useFixLink();
  const navigate = useNavigate();
  const [asset, setAsset] = useStream(asset$);
  const [contract, setContract] = useStream(contract$);
  const [maturity, setMaturity] = useStream(maturity$);
  const maturityMap = useObservable(maturityMap$, {});
  const symbols = useObservable(contracts$, []);

  const contracts = useMemo(() => {
    return symbols
      .reduce<string[]>((arr, s) => {
        if (arr.indexOf(s.symbolLevel2Category) < 0) {
          return [...arr, s.symbolLevel2Category];
        }
        return arr;
      }, [])
      .map((s) => ({label: <Label d={s} />, value: s}));
  }, [symbols]);

  const maturities = useMemo(() => {
    return symbols
      .filter((s) => s.symbolLevel2Category === contract)
      .map((s) => ({label: s.term, value: s.term}));
  }, [symbols, contract]);

  const baseContract = useMemo<any>(() => {
    if (!asset || !contract) {
      return;
    }
    const maturityList = maturityMap[asset + '-' + contract];
    const current = maturityList?.find((m) => m.term === maturity);
    if (current) {
      queryRecentTrades$.next(current.symbol);
      recentTrades$.next(`dc.md.market.trade.${current.symbol}`);
    }
    return current;
  }, [asset, contract, maturity, maturityMap, params]);

  useEffect(() => {
    if (baseContract && params?.contract?.toLowerCase() !== baseContract?.symbol?.toLowerCase()) {
      navigate(fixLink(`/trade/${baseContract.symbol}`));
    }
  }, [baseContract, params]);

  useEffect(() => {
    if (symbols?.length > 0 && !contract && !maturity) {
      let item = symbols[0];
      const param = symbols?.find(
        (s) => s.symbol?.toLowerCase() === params?.contract?.toLowerCase()
      );
      if (param) {
        item = param;
      }
      setContract(item.symbolLevel2Category);
      setMaturity(item.term);
    }
  }, [symbols, contract, maturity]);

  useEffect(() => {
    const ss = symbols.filter((s) => s.symbolLevel2Category === contract);
    if (!ss.find((s) => s.term === maturity) && ss.length > 0) {
      setMaturity(ss[0].term);
    }
  }, [symbols, contract, maturity]);

  return {
    asset,
    contract,
    maturity,
    setAsset,
    setContract,
    setMaturity,
    contracts,
    maturities,
    baseContract,
  };
}

const Label = ({d}: {d: string}) => (
  <div className="flex flex-row items-center gap-8px">
    <img src={IMAGES[d.toUpperCase()]} alt="" width={24} height={24} />
    {d}
  </div>
);
