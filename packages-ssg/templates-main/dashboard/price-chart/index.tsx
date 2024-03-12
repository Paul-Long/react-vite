import {Title} from '@/dashboard/components/Title';
import {StyledPriceChartWrap} from '@/dashboard/components/styles';
import {Charts} from '@/dashboard/price-chart/Charts';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';
import React from 'react';

export function PriceChart() {
  const {LG} = useLang();
  return (
    <StyledPriceChartWrap className="df fdc flex-1 gap24px box-border overflow-hidden">
      <Title>{LG(lang.PriceChart)}</Title>
      <Charts />
    </StyledPriceChartWrap>
  );
}
