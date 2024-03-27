import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {RadioButtonGroup} from '@rx/widgets';

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
  {
    text: <span className="text-wrap max-w100px">{LG(tradeLang.LongYieldFloater)}</span>,
    value: 'Long',
  },
  {
    text: <span className="text-wrap max-w100px">{LG(tradeLang.ShortYieldFixer)}</span>,
    value: 'Short',
  },
];
