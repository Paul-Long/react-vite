import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {useState} from 'react';
import {ProgressSlider} from './ProgressSlider';

export function Leverage() {
  const {LG} = useLang();
  const [leverage, setLeverage] = useState(2.8);
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row justify-between items-center">
        <div className="font-size-14px text-gray-400">{LG(lang.LeverageSlider)}</div>
        <div className="font-size-12px text-green-600">{LG(lang.MaximumLeverage)} : 11.2x</div>
      </div>
      <div className="text-green-500 font-size-24px lh-36px font-medium">{leverage}x</div>
      <ProgressSlider value={leverage} max={11.2} unit="x" onChange={(v) => setLeverage(v)} />
    </div>
  );
}
