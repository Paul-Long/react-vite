import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {contract$, maturity$} from '../streams/streams';
import {InputNumber} from './InputNumber';

interface Props {
  value?: string | number;
  onChange?: (v: string | number) => void;
}

export function AmountInput(props: Props) {
  const {LG} = useLang();
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row items-center justify-between text-gray-600">
        {LG(lang.NotionalAmount)}
      </div>
      <div className="flex flex-row items-center justify-between">
        <InputNumber value={props.value} onChange={props.onChange} />
        <div className="text-gray-600">
          y{contract}-{maturity}
        </div>
      </div>
    </div>
  );
}
