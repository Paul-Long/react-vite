import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {Tooltip} from '@rx/widgets';
import {ProgressSlider} from './ProgressSlider';

interface Props {
  max: number;
  value: number;
  onChange?: (v: number) => void;
}

export function Leverage(props: Props) {
  const {LG} = useLang();
  const {value, max = 10, onChange} = props;

  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row justify-between items-center">
        <div className="font-size-14px text-gray-600">{LG(lang.LeverageSlider)}</div>
        <Tooltip text={`${LG(lang.MaximumLeverage)} : ${max}x`}>
          <div className="font-size-12px text-green-600 underline underline-dotted cursor-help">
            {LG(lang.MaximumLeverage)} : {max}x
          </div>
        </Tooltip>
      </div>
      <div className="text-green-500 font-size-24px lh-36px font-medium text-right">{value}x</div>
      <ProgressSlider value={value} min={1} max={max} unit="x" onChange={(v) => onChange?.(v)} />
    </div>
  );
}
