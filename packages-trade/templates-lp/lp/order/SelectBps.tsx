import {StyledBpsItem, StyledBpsWrap, StyledItemWrap} from '@/lp/order/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import React, {useState} from 'react';

export function SelectBps() {
  const {LG} = useLang();
  const [bp, setBp] = useState(300);
  return (
    <StyledItemWrap className="df fdc gap16px fw700 p12px">
      <div className="T5">{LG(lang.StandardRange)}</div>
      <StyledBpsWrap className="gap10px">
        {[50, 100, 200, 300].map((bps) => (
          <StyledBpsItem
            key={bps}
            $active={bp === bps}
            onClick={() => setBp(bps)}
            className="font-size-12px"
          >
            ±{bps}bps
          </StyledBpsItem>
        ))}
      </StyledBpsWrap>
    </StyledItemWrap>
  );
}
