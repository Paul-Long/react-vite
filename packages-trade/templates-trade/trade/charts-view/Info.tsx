import {useChartsState} from '@/trade/charts-view/state';
import {StyledInfoGrid, StyledInfoWrap} from '@/trade/charts-view/styles';
import {data} from '@/trade/mock/header/header-json';
import {Select} from '@rx/widgets/select/Select';
import React, {useEffect, useState} from 'react';

export function Info() {
  const {contract, contracts, setContract, maturity, maturities, setMaturity} = useChartsState();
  return (
    <StyledInfoWrap className="df fdr aic w100% gap-20px pb8px">
      <div className="df fdr aic g12">
        <Select
          className="w120px fwbold"
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
      <PriceInfo contract={contract as string} maturity={maturity as string} />
    </StyledInfoWrap>
  );
}

function PriceInfo({contract, maturity}: {contract?: string; maturity?: string}) {
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    setItem(data[`${contract}-${maturity}`]);
  }, [contract, maturity]);

  return (
    <StyledInfoGrid>
      {[
        'TTM',
        'Yield',
        'YT',
        'Cumulative YT',
        '24h %',
        '24h H',
        '24h L',
        '24h Vol.',
        'Open Interest',
        'Available Liquidity',
      ].map((o) => (
        <div key={o} className="df fdc jcc aic font-size-14px">
          <span className="T7 fw700" style={{whiteSpace: 'nowrap'}}>
            {o}
          </span>
          <span className="T3 fw700" style={{whiteSpace: 'nowrap'}}>
            {item?.[o] ?? '-'}
          </span>
        </div>
      ))}
    </StyledInfoGrid>
  );
}
