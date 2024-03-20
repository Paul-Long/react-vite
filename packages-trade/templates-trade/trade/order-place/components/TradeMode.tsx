import {mode$} from '@/trade/streams/streams';
import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {RadioButtonGroup} from '@rx/widgets';
import {useCallback} from 'react';

export function TradeMode({
  value,
  onChange,
}: {
  value: any;
  onChange: (key: string, v: any) => void;
}) {
  const {LG} = useLang();

  const handleChange = useCallback((v: string) => {
    mode$.next(v);
    onChange('mode', v);
  }, []);

  return (
    <RadioButtonGroup
      options={genDirectionOptions(LG)}
      size="middle"
      value={value}
      onChange={handleChange}
    />
  );
}
export const genDirectionOptions = (LG: Function) => [
  {
    text: (
      <div className="df fdc aic">
        <span>{LG(tradeLang.YieldTrading)}</span>
        <span>{LG(tradeLang.Mode)}</span>
      </div>
    ),
    value: 'YT',
  },
  {
    text: (
      <div className="df fdc aic">
        <span style={{whiteSpace: 'nowrap'}}>{LG(tradeLang.InterestRateSwap)}</span>
        <span>{LG(tradeLang.Mode)}</span>
      </div>
    ),
    value: 'IRS',
  },
];
