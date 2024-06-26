import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {clsx} from 'clsx';

interface Props {
  value: string;
  onChange?: (v: string) => void;
}

export function DataType(props: Props) {
  const {LG} = useLang();
  return (
    <div className="flex flex-row items-center gap-10px">
      {genChartType(LG).map((t) => (
        <div
          key={t.value}
          className={clsx(
            'box-border px-12px py-7px lh-18px border-1px border-solid cursor-pointer rounded-2px',
            [props.value === t.value ? 'bg-lime-10 text-lime-500 border-lime-10' : 'border-#2C2D2D']
          )}
          onClick={() => props.onChange?.(t.value)}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}

export const genChartType = (LG: any) => [
  {
    label: (
      <div className="text-nowrap px-8px font-size-14px lh-18px fw-medium">{LG(lang.YTPrice)}</div>
    ),
    value: 'Price',
  },
  {
    label: (
      <div className="text-nowrap px-8px font-size-14px lh-18px fw-medium">
        {LG(lang.ImpliedYield)}
      </div>
    ),
    value: 'Yield',
  },
];
