import {CardTabs} from '@/pages/trade/pc/CardTabs';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';

type Type = 'market' | 'limit' | 'stopMarket' | 'tp/sl';

interface Props {
  value: Type;
  onChange: (v: Type) => void;
}

export function OrderType(props: Props) {
  const {LG} = useLang();
  return (
    <CardTabs
      size="sm"
      options={genTypes(LG)}
      value={props.value}
      onChange={(t: string) => props.onChange(t as Type)}
    />
  );
}

const genTypes = (LG: any) => [
  {label: LG(clang.Market), value: 'market'},
  {label: LG(lang.Limit), value: 'limit', disabled: true},
  {label: LG(lang.StopMarket), value: 'stopMarket', disabled: true},
  {label: 'TP/SL', value: 'tp/sl', disabled: true},
];
