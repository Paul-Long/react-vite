import {Charts} from '@/trade/charts-view/Charts';
import {Info} from '@/trade/charts-view/Info';
import {Info24} from '@/trade/charts-view/Info24';
import {RecentTrades} from '@/trade/recent-trades/RecentTrades';
import React from 'react';
import {StyledChartsViewWrap} from './styles';

export function ChartsView() {
  return (
    <StyledChartsViewWrap className="df fdc h100%">
      <Info />
      <div className="df fdr h100% overflow-hidden position-relative">
        <Info24 />
        <Charts />
        <RecentTrades />
      </div>
    </StyledChartsViewWrap>
  );
}
