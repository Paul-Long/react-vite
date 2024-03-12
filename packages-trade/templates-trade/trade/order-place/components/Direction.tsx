import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {RadioButtonGroup} from '@rx/widgets';
import React from 'react';

export function Direction({
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
      onChange={(v: any) => onChange('direction', v)}
    />
  );
}
export const genDirectionOptions = (LG: Function) => [
  {text: LG(tradeLang.LongYieldFloater), value: 'Long'},
  {text: LG(tradeLang.ShortYieldFixer), value: 'Short'},
];
