import {Title} from '@/portfolio/components/Title';
import {StyledAccountWrap} from '@/portfolio/components/styles';
import {genEarnColumns, genTabs} from '@/portfolio/strategy-account/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Table, Tabs} from '@rx/widgets';
import React, {useState} from 'react';

export function StrategyAccount() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Earn');
  return (
    <StyledAccountWrap className="df fdc gap24px">
      <Title>{LG(lang.StrategyAccount)}</Title>
      <div className="df fdc">
        <Tabs
          type="line"
          size="small"
          options={genTabs(LG)}
          active={tab}
          onChange={(tab) => setTab(tab)}
        />
        {tab === 'Earn' && <Table columns={genEarnColumns(LG)} dataSource={[]}></Table>}
      </div>
    </StyledAccountWrap>
  );
}
