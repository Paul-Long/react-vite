import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream.ts';
import {lang} from '@rx/lang/common.lang';
import {useTradeYieldChart} from '../hooks/use-trade-yield-chart.ts';
import {time$} from '../streams/streams';
import {CardTabs} from './CardTabs';

export function ChartWrap() {
  const {LG} = useLang();
  const [time, setTime] = useStream<string>(time$);
  const {resize, container} = useTradeYieldChart({});
  return (
    <div
      className="flex flex-col min-h-560px h-560px b-solid b-gray-40 b-b-1px box-border"
      onResize={resize}
    >
      <div className="flex flex-row items-center justify-between p-16px b-solid b-gray-40 b-b-1px">
        <div className="flex flex-row items-center gap-16px">
          <div className="font-size-14px lh-16px text-gray-600">{LG(lang.Time)}</div>
          <CardTabs size="sm" options={genTimes()} value={time} onChange={(t) => setTime(t)} />
        </div>
      </div>
      <div className="flex-1" ref={container}></div>
    </div>
  );
}

const genTimes = () =>
  ['1M', '5M', '15M', '30M', '1D', '1W', '1N', '1Y'].map((t) => ({label: t, value: t}));
