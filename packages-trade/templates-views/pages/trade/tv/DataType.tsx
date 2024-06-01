import {useLang} from '@rx/hooks/use-lang';
import {RadioButton} from '@rx/widgets';
import {genChartType} from '../place-order/const';

interface Props {
  value: string;
  onChange?: (v: string) => void;
}

export function DataType(props: Props) {
  const {LG} = useLang();
  return (
    <RadioButton
      height={32}
      options={genChartType(LG)}
      value={props.value}
      onChange={(v: string) => props.onChange?.(v)}
    />
  );
}
