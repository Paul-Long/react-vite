import {useTradeYieldChart} from '@/hooks/use-trade-yield-chart';
import {StyledCharts} from '@/views/charts-view/styles';

export function ChartView() {
  const {resize, container, mode, setMode} = useTradeYieldChart({});

  return (
    <StyledCharts
      className="position-relative df fdc flex-1 h100% overflow-hidden"
      onResize={resize}
    >
      <div ref={container as any} className="flex-1" />
    </StyledCharts>
  );
}
