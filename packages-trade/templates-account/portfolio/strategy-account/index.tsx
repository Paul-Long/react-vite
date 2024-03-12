import {Title} from '@/portfolio/components/Title';
import {StyledAccountWrap} from '@/portfolio/components/styles';
import {CarryTrade} from '@/portfolio/strategy-account/CarryTrade';
import {Earn} from '@/portfolio/strategy-account/Earn';
import {SyntheticAsset} from '@/portfolio/strategy-account/SyntheticAsset';
import {genTabs} from '@/portfolio/strategy-account/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Tabs} from '@rx/widgets';
import React, {useState} from 'react';

export function StrategyAccount() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Earn');
  return (
    <StyledAccountWrap className="df fdc gap24px">
      <Title>{LG(lang.StrategyAccount)}</Title>
      <div className="df fdc">
        <Tabs type="line" options={genTabs(LG)} active={tab} onChange={(tab) => setTab(tab)} />
        {tab === 'Earn' && <Earn />}
        {tab === 'CarryTrade' && <CarryTrade />}
        {tab === 'SyntheticAsset' && <SyntheticAsset />}
      </div>
    </StyledAccountWrap>
  );
}
