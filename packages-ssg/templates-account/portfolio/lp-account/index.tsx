import {Title} from '@/portfolio/components/Title';
import {StyledAccountWrap} from '@/portfolio/components/styles';
import {genLiveColumns, genTabs} from '@/portfolio/lp-account/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Table, Tabs} from '@rx/widgets';
import React, {useState} from 'react';

export function LpAccount() {
  const {LG} = useLang();
  const [tab, setTab] = useState('LiveLPPosition');
  return (
    <StyledAccountWrap className="df fdc gap24px">
      <Title>{LG(lang.LPAccount)}</Title>
      <div className="df fdc">
        <Tabs type="line" size="small" options={genTabs(LG)} />
        {tab === 'LiveLPPosition' && <Table columns={genLiveColumns(LG)} dataSource={[]}></Table>}
      </div>
    </StyledAccountWrap>
  );
}
