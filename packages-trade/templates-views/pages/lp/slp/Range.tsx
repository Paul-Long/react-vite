import {InputNumber} from '@/pages/trade/place-order/InputNumber';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {clsx} from 'clsx';
import {useCallback, useEffect, useState} from 'react';

interface Props {
  value: string;
  onChange: (v: string | number) => void;
}

export function Range(props: Props) {
  const {LG} = useLang();
  const [lower, setLower] = useState<string>('6');
  const [upper, setUpper] = useState<string>('8');

  useEffect(() => {
    const [l, u] = props.value.split('-');
    setLower(l);
    setUpper(u);
  }, []);

  useEffect(() => {
    if (lower && upper) {
      props.onChange([lower, upper].join('-'));
    }
  }, [lower, upper]);

  const handleSelect = useCallback((value: string) => {
    const [l, u] = value.split('-');
    setLower(l);
    setUpper(u);
  }, []);

  return (
    <div className="flex flex-col gap-20px">
      <div className="grid grid-cols-2 gap-8px">
        {[
          ['6-8', '6.00% - 8.00%'],
          ['5-9', '5.00% - 9.00%'],
          ['4-10', '4.00% - 10.00%'],
          ['2-12', '2.00% - 12.00%'],
        ].map(([key, text]) => (
          <div
            key={key}
            className={clsx(
              'font-size-16px lh-22px text-center py-12px rounded-8px bg-gray-40 cursor-pointer',
              [props.value === key ? '0.06-0.08 fw-semibold text-white' : 'text-gray-600']
            )}
            onClick={() => handleSelect(key)}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex flex-col px-12px">
        <div className="flex flex-row justify-between font-size-14px lh-22px text-gray-600">
          <div>{LG(lang.LowerRate)}</div>
          <div>{LG(lang.UpperRate)}</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <InputNumber
            value={lower}
            align="left"
            type="percentage"
            color="text-white"
            step={2}
            onChange={(v: string) => setLower(v)}
          />
          <span>-</span>
          <InputNumber
            value={upper}
            align="right"
            type="percentage"
            color="text-white"
            step={2}
            onChange={(v: string) => setUpper(v)}
          />
        </div>
      </div>
    </div>
  );
}
