import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {Tabs} from '@rx/widgets';
import {Page} from '@trade/components/page';
import React, {useCallback, useState} from 'react';
import {styled} from 'styled-components';
import {CarryTrade} from './carry-trade';
import {Earn} from './earn';
import {StyledTabPane} from './styles';
import {SyntheticAsset} from './synthetic-asset';

const StyledWrap = styled.div`
  min-height: 100%;
  background: var(--dark-blue);
`;

export function StrategyTemplate() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Earn');

  const genOptions = useCallback(() => {
    return ['Earn', 'CarryTrade', 'SyntheticAsset'].map((key) => {
      return {text: LG(lang[key]), key};
    });
  }, [LG]);

  return (
    <Page>
      <StyledWrap className="flex-1 df fdc w100% pt24px">
        <Tabs type="card" active={tab} onChange={(t) => setTab(t)} options={genOptions()} />
        <StyledTabPane className="w100%">
          {tab === 'Earn' && <Earn />}
          {tab === 'CarryTrade' && <CarryTrade />}
          {tab === 'SyntheticAsset' && <SyntheticAsset />}
        </StyledTabPane>
      </StyledWrap>
    </Page>
  );
}
