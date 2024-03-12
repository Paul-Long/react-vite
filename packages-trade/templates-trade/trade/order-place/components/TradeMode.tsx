import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {RadioButtonGroup} from '@rx/widgets';
import React from 'react';

export function TradeMode({
  value,
  onChange,
}: {
  value: any;
  onChange: (key: string, v: any) => void;
}) {
  const {LG} = useLang();
  return (
    <RadioButtonGroup
      options={genDirectionOptions(LG)}
      size="middle"
      value={value}
      onChange={(v: any) => onChange('mode', v)}
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
