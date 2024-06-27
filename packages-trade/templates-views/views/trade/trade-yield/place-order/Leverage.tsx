import {SlippageIcon} from '@rx/components/icons/SlippageIcon';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {NumberInput, ProgressSlider} from '@rx/widgets';
import {useCallback, useRef} from 'react';

export function Leverage(props: FormItemProps & {max?: number}) {
  const {LG} = useLang();
  const {value, max = 10, onChange} = props;
  const focus = useRef<any>(null);

  const handleChange = useCallback(
    (v: string | number) => {
      if (Number(v) !== Number(value)) {
        onChange?.(v !== '' ? Math.max(Math.min(Number(v), max), 1) : v);
      }
    },
    [value]
  );

  const handleBlur = useCallback(() => {
    if (!value) {
      onChange?.(1);
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-24px py-12px border-b-1px border-solid border-#2C2D2D">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8px font-size-12px lh-18px">
          <SlippageIcon />
          <span className="text-gray-60">{LG(lang.Leverage)}</span>
          <span className="text-lime-60">{LG(lang.MaximumLeverage)}</span>
        </div>
        <div className="w-48px flex flex-row items-center py-3px border-1px border-solid border-#2C2D2D">
          <NumberInput
            unit="x"
            size="sm"
            align="center"
            type="percentage"
            color="text-lime-500"
            value={value}
            wrapStyle={{paddingRight: 8}}
            onFocus={() => (focus.current = 'input')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <ProgressSlider
        value={(value || 1) as number}
        min={1}
        max={max}
        unit="x"
        onChange={handleChange}
        onFocus={() => (focus.current = 'progress')}
      />
    </div>
  );
}
