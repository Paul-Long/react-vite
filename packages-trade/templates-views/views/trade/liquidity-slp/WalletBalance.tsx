import {IMAGES} from '@/pages/lp/const';
import {WalletIcon} from '@rx/components/icons/WalletIcon';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {balance$, marketToMargin} from '@rx/web3/streams/balance';
import {NumberInput, ProgressSlider} from '@rx/widgets';
import Big from 'big.js';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

interface Props {
  currency?: string;
  marketIndex?: number;
  value?: string | number;
  onChange?: (v: string | number) => void;
}

export function WalletBalance(props: Props) {
  const {marketIndex, value} = props;
  const {LG} = useLang();
  const focus = useRef(false);
  const balanceMap = useObservable(balance$, {});
  const balance = useMemo(
    () => (typeof marketIndex !== 'undefined' ? balanceMap?.[marketToMargin(marketIndex)] ?? 0 : 0),
    [balanceMap, marketIndex]
  );
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!value) {
      setPercent(0);
    }
  }, [balance, value]);

  const handlePercentChange = useCallback(
    (v: number) => {
      setPercent(v);
      if (!focus.current) {
        props.onChange?.(
          Big(balance)
            .times(v || 0)
            .div(100)
            .toString()
        );
      }
    },
    [balance]
  );

  const handleChange = useCallback(
    (v: string | number) => {
      if (!!v && Big(v).gt(balance)) {
        v = Number(balance);
      }
      props.onChange?.(v);
      if (focus.current) {
        setPercent(Number(balance) > 0 && !!v ? Big(v).times(100).div(balance).toNumber() : 0);
      }
    },
    [balance]
  );

  return (
    <div className="flex flex-col gap-12px py-12px border-b-1px border-b-solid border-b-#2C2D2D">
      <div className="flex flex-row items-center justify-between font-size-12px lh-18px text-gray-60">
        {LG(lang.AddLiquidity)}
        <div className="flex flex-row items-center gap-4px">
          <WalletIcon width={16} height={16} />
          {balance}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-8px lh-18px fw-medium">
          <img
            src={IMAGES[props.currency ? props.currency.toUpperCase() : 'MSOL']}
            alt=""
            width={20}
            height={20}
          />
          {props.currency ?? ''}
        </div>
        <div className="flex flex-col items-end gap-8px">
          <NumberInput
            size="sm"
            align="right"
            color="text-#FFD166"
            value={props.value}
            onChange={handleChange}
            placeholder="0.00"
            onFocus={() => (focus.current = true)}
            onBlur={() => (focus.current = false)}
            step={4}
          />
        </div>
      </div>

      <div className="w-full mt-8px">
        <ProgressSlider value={percent} min={0} max={100} unit="%" onChange={handlePercentChange} />
      </div>
    </div>
  );
}
