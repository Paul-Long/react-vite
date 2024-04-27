import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';
import {useState} from 'react';
import {CardTabs} from './CardTabs';

export function ChartWrap() {
  const {LG} = useLang();
  const [time, setTime] = useState<string>('1D');
  return (
    <div className="min-h-560px h-560px b-solid b-gray-40 b-b-1px box-border">
      <div className="flex flex-row items-center justify-between p-16px b-solid b-gray-40 b-b-1px">
        <div className="flex flex-row items-center">
          <div className="font-size-14px lh-16px text-gray-400">{LG(lang.Time)}</div>
          <CardTabs size="sm" options={genTimes()} value={time} onChange={(t) => setTime(t)} />
        </div>
      </div>
    </div>
  );
}

const genTimes = () => [
  {label: '1H', value: '1H'},
  {label: '2H', value: '2H'},
  {label: '4H', value: '4H'},
  {label: '1D', value: '1D'},
  {label: '1W', value: '1W'},
  {label: '1M', value: '1M'},
];
