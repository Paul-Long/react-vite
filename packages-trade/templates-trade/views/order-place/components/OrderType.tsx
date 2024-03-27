import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {Tabs} from '@rx/widgets';
import React from 'react';

interface Props {
  value: any;
  onChange: (key: string, v: any) => void;
}

export function OrderType(props: Props) {
  const {LG} = useLang();
  const {value, onChange} = props;
  return (
    <Tabs
      type="card"
      size="small"
      filled={true}
      options={genOrderTypes(LG)}
      active={value}
      onChange={(v: string) => onChange('orderType', v)}
    />
  );
}

export const genOrderTypes = (LG: Function) => [
  {text: LG(tradeLang.Market), key: 'Market'},
  {text: LG(tradeLang.Limit), key: 'Limit'},
  {text: LG(tradeLang.StopMarket), key: 'StopMarket'},
  {text: LG(clang.TP) + '/' + LG(clang.SL), key: 'StopLimit'},
];
