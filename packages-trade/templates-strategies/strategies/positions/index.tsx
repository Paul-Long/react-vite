import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Tabs} from '@rx/widgets';
import React, {useState} from 'react';
import {styled} from 'styled-components';
import {CarryTrade} from './CarryTrade';
import {Earn} from './Earn';
import {SyntheticAsset} from './SyntheticAsset';
import {genTabs} from './state';

const StyledAccountWrap = styled.div``;

const StyledWrap = styled.div`
  border-left: 1px solid var(--golden);
  color: var(--golden);
  padding: 0 12px;
`;

export function Positions() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Earn');
  return (
    <StyledAccountWrap className="df fdc gap24px flex-1 mt24px pl24px pr24px">
      <StyledWrap className="fw700">{LG(lang.StrategyAccount)}</StyledWrap>
      <div className="df fdc flex-1">
        <Tabs type="line" options={genTabs(LG)} active={tab} onChange={(t) => setTab(t)} />
        {tab === 'Earn' && <Earn />}
        {tab === 'CarryTrade' && <CarryTrade />}
        {tab === 'SyntheticAsset' && <SyntheticAsset />}
      </div>
    </StyledAccountWrap>
  );
}
