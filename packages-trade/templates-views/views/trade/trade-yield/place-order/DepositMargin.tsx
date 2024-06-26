import {crossMargin$} from '@/streams/trade/cross-margin';
import {SOLIcon} from '@rx/components/icons/SOLIcon';
import {WalletIcon} from '@rx/components/icons/WalletIcon';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/trade.lang';
import {balance$, marketIndex$} from '@rx/web3/streams/balance';
import {Checkbox, NumberInput, Tooltip} from '@rx/widgets';
import {Select} from '@rx/widgets/select';
import {clsx} from 'clsx';
import {useEffect} from 'react';

interface Props {
  marginType?: string;
  value?: string | number;
  onChange?: (v: string | number) => void;
  onFocus?: (e: any) => void;
  marginWaiver: boolean;
  onMarginWaiverChange: (v: boolean) => void;
}

export function DepositMargin(props: Props) {
  const {marginType} = props;
  const {LG} = useLang();
  const balance = useObservable(balance$, 0);
  const crossMargin: any = useObservable(crossMargin$, {remainMargin: '0'});
  useEffect(() => {
    marketIndex$.next(-1);
  }, []);
  return (
    <div className="flex flex-col py-12px gap-12px border-b-1px border-b-solid border-#2C2D2D">
      <div className="flex flex-row items-center justify-between text-gray-60 font-size-12px lh-18px">
        <Tooltip
          className="min-w-200px"
          text={`input margin amount can't exceed # due to your slippage settings.`}
        >
          <span className="underline underline-dotted cursor-help">{LG(lang.DepositMargin)}</span>
        </Tooltip>
        <div className="flex flex-row items-center gap-4px text-gray-500">
          <WalletIcon width={16} height={16} />
          {balance}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Select
          placement="bottom"
          border={false}
          options={[{label: <Label />, value: 'SOL'}]}
          value="SOL"
          triggerStyle={{paddingLeft: 0}}
        />
        <NumberInput
          value={props.value}
          onChange={props.onChange}
          placeholder="0.00"
          align="right"
          step={9}
          onFocus={props.onFocus}
          color="text-yellow-500"
        />
      </div>
      <div
        className={clsx('flex-row justify-between items-center justify-between', [
          marginType === 'ISOLATED' ? 'hidden' : 'flex',
        ])}
      >
        <Checkbox
          className="text-gray-60 font-size-12px lh-18px"
          value={props.marginWaiver}
          onChange={() => props.onMarginWaiverChange(!props.marginWaiver)}
        >
          <Tooltip
            className="min-w-320px text-wrap"
            text="margin waiver lets you open positions without paying the margin up to the allowance amount. However, this will increase your leverage and lower your collateral ratio (CR)."
          >
            <div className="underline underline-dotted cursor-help">{LG(lang.MarginWaiver)}</div>
          </Tooltip>
        </Checkbox>
        <div className="font-size-12px lh-18px">{crossMargin?.remainMargin ?? '0'}</div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="flex flex-row justify-start items-center gap-8px">
      <SOLIcon className="ml-[-2px] bg-gray-4 rounded-20px" width={20} height={20} />
      SOL
    </div>
  );
}
