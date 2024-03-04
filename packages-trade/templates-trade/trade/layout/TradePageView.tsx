import {ChainsView} from '@/trade/chains/ChainsViews';
import {ChartsView} from '@/trade/charts-view/ChartsView';
import {OrderView} from '@/trade/order-place/OrderView';
import {PositionsView} from '@/trade/positions/PositionsView';
import React from 'react';
import {styled} from 'styled-components';

const Wrap = styled.section`
  min-height: 100%;
`;

const Content = styled.div`
  min-height: 100%;
  background: var(--dark-blue);
`;

const LeftContainer = styled.div`
  min-width: 150px;
  max-width: 150px;
  height: 100%;
  border-right: 1px solid var(--slate-gray-blue);
`;

const ChartView = styled.div`
  height: 600px;
`;

const RightContainer = styled.div`
  display: flex;
  width: 380px;
  background-color: var(--dense-blue);
  overflow: hidden;
`;

export function TradePageView() {
  return (
    <Wrap className="df fdr">
      <Content className="df fdc f1 overflow-hidden">
        <div className="df fdr">
          <LeftContainer>
            <ChainsView />
          </LeftContainer>
          <ChartView className="f1">
            <ChartsView />
          </ChartView>
        </div>
        <PositionsView />
      </Content>
      <RightContainer>
        <OrderView />
      </RightContainer>
    </Wrap>
  );
}
