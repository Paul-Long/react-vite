import {contract$, maturity$} from '@/streams/trade/page-state';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {contracts$} from '@rx/streams/config';
import {Select} from '@rx/widgets/select';
import {useEffect, useMemo} from 'react';

export function MaturitySelect() {
  const [contract] = useStream(contract$);
  const [maturity, setMaturity] = useStream(maturity$);
  const contracts = useObservable(contracts$, []);

  const maturities = useMemo(() => {
    return contracts?.filter((con) => con.symbolLevel2Category === contract);
  }, [contract, contracts]);

  useEffect(() => {
    const ma = maturities?.find((con) => con.term === maturity);
    if (!ma && maturities?.[0]) {
      setMaturity(maturities[0].term);
    }
  }, [maturities, maturity]);

  return (
    <Select
      value={maturity}
      className="min-w-82px"
      placement="bottomLeft"
      onChange={(v) => setMaturity(v)}
      options={maturities?.map((ma) => ({label: ma.term, value: ma.term}))}
    />
  );
}
