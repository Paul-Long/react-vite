import {useChartsState} from '@/trade/charts-view/state';
import {StyledInfoGrid} from '@/trade/charts-view/styles';
import {data} from '@/trade/mock/header/header-json';
import React, {useEffect, useState} from 'react';

export function Info24() {
  const {contract, contracts, setContract, maturity, maturities, setMaturity} = useChartsState();
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    setItem(data[`${contract}-${maturity}`]);
  }, [contract, maturity]);

  return (
    <StyledInfoGrid $row={4} className="position-absolute top-12px left-100px z-10">
      {['24h %', '24h H', '24h L', '24h Vol.'].map((o) => (
        <div key={o} className="df fdr jcc aic font-size-12px gap4px">
          <span className="T7 fw700" style={{whiteSpace: 'nowrap'}}>
            {o}:
          </span>
          <span className="T3 fw700" style={{whiteSpace: 'nowrap'}}>
            {item?.[o] ?? '-'}
          </span>
        </div>
      ))}
    </StyledInfoGrid>
  );
}
