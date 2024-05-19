import {IMAGES} from '@/pages/lp/const';
import {Select} from '@/pages/trade/place-order/Select';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/trade.lang';
import {balance$} from '@rx/web3/streams/balance';
import {Checkbox} from '@rx/widgets';
import {InputNumber} from './InputNumber';

interface Props {
  marginType?: string;
  value?: string | number;
  onChange?: (v: string | number) => void;
  onFocus?: (e: any) => void;
  marginWaiver: boolean;
  onMarginWaiverChange: (v: boolean) => void;
}

export function DepositMargin(props: Props) {
  const {LG} = useLang();
  const balance = useObservable(balance$, 0);
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row items-center justify-between text-gray-600">
        <span>{LG(lang.DepositMargin)}</span>
        <div className="flex flex-row items-center gap-4px text-white">
          <img src={IMAGES.WALLET} alt="" />
          {balance}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Select options={[{label: <Label />, value: 'SOL'}]} value="SOL" />
        <InputNumber
          value={props.value}
          onChange={props.onChange}
          placeholder="0.00"
          align="right"
          step={9}
          onFocus={props.onFocus}
          color="text-yellow-500"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Checkbox
          className="text-gray-600"
          value={props.marginWaiver}
          onChange={() => props.onMarginWaiverChange(!props.marginWaiver)}
        >
          {LG(lang.MarginWaiver)}
        </Checkbox>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="flex flex-row items-center gap-8px">
      <img src={IMAGES.MSOL} alt="" width={24} height={24} />
      SOL
    </div>
  );
}
