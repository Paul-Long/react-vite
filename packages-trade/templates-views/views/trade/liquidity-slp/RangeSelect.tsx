import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {NumberInput} from '@rx/widgets';
import {clsx} from 'clsx';
import {useCallback, useEffect, useState} from 'react';

interface Props {
  value: string;
  onChange: (v: string | number) => void;
}

export function RangeSelect(props: Props) {
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
    <div className="flex flex-col gap-12px pb-12px border-b-1px border-b-solid border-b-#2C2D2D">
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
              'box-border font-size-14px lh-18px text-center py-12px rounded-2px cursor-pointer',
              [
                props.value === key
                  ? 'fw-medium text-gray-500 bg-gray-10'
                  : 'text-gray-60 border-1px border-solid border-#2C2D2D',
              ]
            )}
            onClick={() => handleSelect(key)}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between font-size-12px lh-18px text-gray-60">
          <div>{LG(lang.LowerRate)}</div>
          <div>{LG(lang.UpperRate)}</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <NumberInput
            value={lower}
            align="left"
            type="percentage"
            size="sm"
            color="text-gray-500"
            step={2}
            onChange={(v: string) => setLower(v)}
          />
          <span>-</span>
          <NumberInput
            value={upper}
            align="right"
            type="percentage"
            size="sm"
            color="text-gray-500"
            step={2}
            onChange={(v: string) => setUpper(v)}
          />
        </div>
      </div>
    </div>
  );
}
