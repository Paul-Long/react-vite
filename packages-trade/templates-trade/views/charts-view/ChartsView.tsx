import {Charts} from '@/views/charts-view/Charts';
import {Info} from '@/views/charts-view/Info';
import {Info24} from '@/views/charts-view/Info24';
import {RecentTrades} from '@/views/recent-trades/RecentTrades';
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
