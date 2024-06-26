import {AssetView} from '@/views/assets-views/AssetsViews';
import {ChartsView} from '@/views/charts-view/ChartsView';
import {OrderView} from '@/views/order-place/OrderView';
import {PositionsView} from '@/views/positions/PositionsView';
import {styled} from 'styled-components';

const Wrap = styled.section`
  min-height: 100%;
`;

const Content = styled.div`
  min-height: 100%;
  background: var(--dark-blue);
`;

const ChartView = styled.div`
  overflow: hidden;
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
        <div className="df fdr overflow-hidden max-w100%">
          <AssetView />
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
