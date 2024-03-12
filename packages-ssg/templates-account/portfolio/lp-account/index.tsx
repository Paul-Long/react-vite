import {Title} from '@/portfolio/components/Title';
import {StyledAccountWrap} from '@/portfolio/components/styles';
import {LivePosition} from '@/portfolio/lp-account/LivePosition';
import {ResidualPosition} from '@/portfolio/lp-account/ResidualPosition';
import {genTabs} from '@/portfolio/lp-account/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Tabs} from '@rx/widgets';
import React, {useState} from 'react';

export function LpAccount() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Live');
  return (
    <StyledAccountWrap className="df fdc gap24px">
      <Title>{LG(lang.LPAccount)}</Title>
      <div className="df fdc">
        <Tabs type="line" options={genTabs(LG)} active={tab} onChange={(t) => setTab(t)} />
        {tab === 'Live' && <LivePosition />}
        {tab === 'Residual' && <ResidualPosition />}
      </div>
    </StyledAccountWrap>
  );
}
