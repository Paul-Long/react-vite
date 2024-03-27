import {useTradeYieldChart} from '@/hooks/use-trade-yield-chart';
import {StyledCharts} from '@/views/charts-view/styles';
import {SelectTypes} from '@/views/components/select-types/SelectTypes';

export function Charts() {
  const {resize, container, mode, setMode} = useTradeYieldChart();

  return (
    <StyledCharts
      className="position-relative df fdc flex-1 h100% overflow-hidden"
      onResize={resize}
    >
      <div ref={container as any} className="flex-1" />
      <div className="pos-absolute top-12px right-12px z-10">
        <SelectTypes theme="dark" value={mode} onChange={(v: string) => setMode(v)} />
      </div>
    </StyledCharts>
  );
}
