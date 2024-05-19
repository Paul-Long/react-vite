import {useKlineData} from '@/pages/trade/hooks/use-kline-data';
import {useTradeYieldChart} from '@/pages/trade/hooks/use-trade-yield-chart';
import {genChartType} from '@/pages/trade/place-order/const';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/common.lang';
import {RadioButton} from '@rx/widgets';
import {chartType$, time$} from '../streams/streams';
import {CardTabs} from './CardTabs';

export function ChartWrap() {
  const {LG} = useLang();
  const [time, setTime] = useStream<string>(time$);
  const [type, setType] = useStream(chartType$);
  const {resize, container} = useTradeYieldChart({});
  useKlineData();
  return (
    <div
      className="relative flex flex-col min-h-560px h-560px b-solid b-gray-40 b-b-1px box-border"
      onResize={resize}
    >
      <div className="flex flex-row items-center justify-between p-16px b-solid b-gray-40 b-b-1px">
        <div className="flex flex-row items-center gap-16px">
          <div className="font-size-14px lh-16px text-gray-600">{LG(lang.Time)}</div>
          <CardTabs size="sm" options={genTimes()} value={time} onChange={(t) => setTime(t)} />
        </div>
      </div>
      <div className="absolute top-70px right-10px z-999">
        <RadioButton
          height={32}
          options={genChartType(LG)}
          value={type}
          onChange={(v: string) => setType(v)}
        />
      </div>
      <div className="flex-1 bg-#030B0F" ref={container}></div>
    </div>
  );
}

const genChartTypes = () => [];

const genTimes = () =>
  [
    ['1m', '1M'],
    ['5m', '5M'],
    ['15m', '15M'],
    ['30m', '30M'],
    ['1D', '1D'],
    ['1W', '1W'],
    ['1M', '1N'],
    ['1Y', '1Y'],
  ].map(([l, v]) => ({label: l, value: v}));
