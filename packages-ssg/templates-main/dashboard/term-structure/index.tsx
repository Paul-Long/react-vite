import {Title} from '@/dashboard/components/Title';
import {StyledTeamsStructureWrap} from '@/dashboard/components/styles';
import {Charts} from '@/dashboard/term-structure/Charts';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';
import React from 'react';

export function TermStructure() {
  const {LG} = useLang();
  return (
    <StyledTeamsStructureWrap className="df fdc flex-1 gap24px box-border overflow-hidden">
      <Title>{LG(lang.TermStructure)}</Title>
      <Charts />
    </StyledTeamsStructureWrap>
  );
}
