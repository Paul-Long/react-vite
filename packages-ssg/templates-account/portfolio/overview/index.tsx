import {useLang} from '@rx/hooks/use-lang';
import React from 'react';
import {StyledOverview} from '../components/styles';
import {Charts} from './Charts';
import {TotalView} from './TotalView';

export function Overview() {
  const {LG} = useLang();
  return (
    <StyledOverview className="df fdr">
      <TotalView />
      <Charts />
    </StyledOverview>
  );
}
