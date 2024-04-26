import {useContract} from '@/hooks/use-contract';
import {Select} from './Select';

export function SubAssetsSelect() {
  const {contracts, contract, setContract, maturities, maturity, setMaturity} = useContract();
  return (
    <div className="flex flex-row items-center gap-48px">
      <Select options={contracts} value={contract} onChange={(v) => setContract(v)} />
      <Select options={maturities} value={maturity} onChange={(v) => setMaturity(v)} />
    </div>
  );
}
