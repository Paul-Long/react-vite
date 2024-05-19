import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {useEffect, useState} from 'react';
import {ProgressSlider} from './ProgressSlider';

interface Props {
  value: number;
  onChange?: (v: number) => void;
}

export function Leverage(props: Props) {
  const {LG} = useLang();
  const [leverage, setLeverage] = useState<number>(props.value);

  useEffect(() => {
    props?.onChange?.(leverage);
  }, [leverage]);

  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row justify-between items-center">
        <div className="font-size-14px text-gray-600">{LG(lang.LeverageSlider)}</div>
        <div className="font-size-12px text-green-600">{LG(lang.MaximumLeverage)} : 10x</div>
      </div>
      <div className="text-green-500 font-size-24px lh-36px font-medium text-right">
        {leverage}x
      </div>
      <ProgressSlider value={leverage} min={1} max={10} unit="x" onChange={(v) => setLeverage(v)} />
    </div>
  );
}
