import {useContract} from '@/hooks/use-contract';
import {useContractInfo} from '@/hooks/use-contract-info';
import {StyledInfoGrid, StyledInfoWrap} from '@/views/charts-view/styles';
import {Select} from '@rx/widgets/select/Select';

export function Info() {
  const {contract, contracts, setContract, maturity, maturities, setMaturity} = useContract();
  return (
    <StyledInfoWrap className="df fdr aic w100% gap-20px pb24px">
      <div className="df fdr aic g12">
        <Select
          className="min-w120px fwbold"
          options={contracts}
          value={contract as string}
          onChange={(v) => setContract(v)}
        />
        <Select
          className="w100px fwbold"
          options={maturities}
          value={maturity as string}
          onChange={(v) => setMaturity(v)}
        />
      </div>
      <PriceInfo />
    </StyledInfoWrap>
  );
}

function PriceInfo() {
  const {info} = useContractInfo();

  return (
    <StyledInfoGrid>
      {['TTM', 'Yield', 'Price', 'Cumulative Price', 'OpenInterest', 'Ava. Liquidity'].map((o) => (
        <div key={o} className="df fdc jcc aic font-size-14px">
          <span className="T7 fw700" style={{whiteSpace: 'nowrap'}}>
            {o}
          </span>
          <span className="T3 fw700" style={{whiteSpace: 'nowrap'}}>
            {info?.[o] ?? '-'}
          </span>
        </div>
      ))}
    </StyledInfoGrid>
  );
}
