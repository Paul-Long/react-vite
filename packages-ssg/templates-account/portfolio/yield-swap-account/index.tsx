import {Title} from '@/portfolio/components/Title';
import {StyledAccountWrap} from '@/portfolio/components/styles';
import {History} from '@/portfolio/yield-swap-account/History';
import {Orders} from '@/portfolio/yield-swap-account/Orders';
import {Positions} from '@/portfolio/yield-swap-account/Positions';
import {genTabs} from '@/portfolio/yield-swap-account/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Tabs} from '@rx/widgets';
import React, {useState} from 'react';

export function YieldSwapAccount() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Position');
  return (
    <StyledAccountWrap className="df fdc gap24px">
      <Title>{LG(lang.YieldSwapAccount)}</Title>
      <div className="df fdc">
        <Tabs
          type="line"
          size="small"
          options={genTabs(LG)}
          active={tab}
          onChange={(tab) => setTab(tab)}
        />
        {tab === 'Position' && <Positions />}
        {tab === 'Orders' && <Orders />}
        {tab === 'History' && <History />}
      </div>
    </StyledAccountWrap>
  );
}
