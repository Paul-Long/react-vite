import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {RadioButtonGroup} from '@rx/widgets';
import React from 'react';

export function MarginType({
  value,
  onChange,
}: {
  value: any;
  onChange: (key: string, v: any) => void;
}) {
  const {LG} = useLang();
  return (
    <RadioButtonGroup
      options={genMarginTypeOptions(LG)}
      value={value}
      size="middle"
      onChange={(v: any) => onChange('marginType', v)}
    />
  );
}
const genMarginTypeOptions = (LG: Function) => [
  {text: <div className="pt10px pb10px">{LG(tradeLang.CrossMargin)}</div>, value: 'Cross'},
  {text: <div className="pt10px pb10px">{LG(tradeLang.IsolatedMargin)}</div>, value: 'Isolated'},
];
