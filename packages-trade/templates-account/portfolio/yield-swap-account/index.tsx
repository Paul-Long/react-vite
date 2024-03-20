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
import {SelectTypes} from './SelectTypes';

export function YieldSwapAccount() {
  const {LG} = useLang();
  const [mode, setMode] = useState('YT');
  const [tab, setTab] = useState('Position');
  return (
    <StyledAccountWrap className="df fdc gap24px">
      <Title>{LG(lang.YieldSwapAccount)}</Title>
      <div className="df fdc">
        <Tabs type="line" options={genTabs(LG)} active={tab} onChange={(tab) => setTab(tab)}>
          <div className="mr24px">
            <SelectTypes value={mode} onChange={(v: string) => setMode(v)} />
          </div>
        </Tabs>
        {tab === 'Position' && <Positions mode={mode} />}
        {tab === 'Orders' && <Orders mode={mode} />}
        {tab === 'History' && <History />}
      </div>
    </StyledAccountWrap>
  );
}
