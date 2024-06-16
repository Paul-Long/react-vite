import {ProgressSlider} from '@/pages/lp/ProgressSlider';
import {IMAGES} from '@/pages/lp/const';
import {InputNumber} from '@/pages/trade/place-order/InputNumber';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {balance$, marketIndex$} from '@rx/web3/streams/balance';
import Big from 'big.js';
import {useCallback, useEffect, useRef, useState} from 'react';

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
  const balance = useObservable(balance$, 0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (typeof marketIndex !== 'undefined') {
      marketIndex$.next(marketIndex);
    }
  }, [marketIndex]);

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
    <div className="flex flex-col gap-12px">
      <div className="font-size-16px lh-24px">{LG(lang.AddLiquidity)}</div>
      <div className="flex flex-row py-10px px-16px justify-between rounded-8px bg-gray-40">
        <div className="flex flex-row items-center gap-8px">
          <img
            src={IMAGES[props.currency ? props.currency.toUpperCase() : 'MSOL']}
            alt=""
            width={24}
            height={24}
          />
          {props.currency ?? ''}
        </div>
        <div className="flex flex-col items-end gap-8px">
          <div className="flex flex-row items-center gap-4px">
            <img src={IMAGES.WALLET} alt="" />
            {balance}
          </div>
          <InputNumber
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

      <div className="w-full px-10px mt-8px">
        <ProgressSlider value={percent} min={0} max={100} unit="%" onChange={handlePercentChange} />
      </div>
    </div>
  );
}
