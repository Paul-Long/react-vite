import {ProgressSlider} from '@/pages/lp/ProgressSlider';
import {InputNumber} from '@/pages/trade/place-order/InputNumber';
import Big from 'big.js';
import {useCallback, useRef, useState} from 'react';

interface Props {
  type: 'number' | 'percentage';
  step: number;
  value: string;
  balance: string;
  onChange: (v: any) => void;
}

export function InputValue({type, step, value, balance, onChange}: Props) {
  const focus = useRef(false);
  const [percent, setPercent] = useState(0);

  const handlePercentChange = useCallback(
    (v: number) => {
      setPercent(v);
      if (!focus.current) {
        onChange?.(
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
      onChange?.(v);
      if (focus.current) {
        setPercent(Number(balance) > 0 && !!v ? Big(v).times(100).div(balance).toNumber() : 0);
      }
    },
    [balance]
  );
  return (
    <div className="flex flex-col">
      <InputNumber
        align="right"
        color="text-#FFD166"
        value={value}
        type={type}
        onChange={handleChange}
        placeholder="0.00"
        step={step}
      />
      <div className="w-full px-10px mt-8px">
        <ProgressSlider value={percent} min={0} max={100} unit="%" onChange={handlePercentChange} />
      </div>
    </div>
  );
}
