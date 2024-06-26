import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {clsx} from 'clsx';

export function OrderType(props: FormItemProps) {
  const {value, onChange} = props;
  const {LG} = useLang();
  return (
    <div className="w-full flex flex-row items-center mt-10px pb-12px border-b-1px border-solid border-#2C2D2D">
      {genTypes(LG).map((t) => (
        <div
          key={t.value}
          className={clsx(
            'flex-1 flex flex-col items-center py-4px px-12px box-border cursor-pointer'
          )}
          onClick={() => onChange?.(t.value)}
        >
          <span
            className={clsx('lh-18px pb-2px text-nowrap', [
              value === t.value ? 'text-gray-500 font-medium' : 'text-gray-60',
            ])}
          >
            {t.label}
          </span>
          <div
            className={clsx('w-10px h-2px bg-gray-500 rounded-2px', [
              value === t.value ? 'opacity-100' : 'opacity-0',
            ])}
          ></div>
        </div>
      ))}
    </div>
  );
}

const genTypes = (LG: any) => [
  {label: LG(clang.Market), value: 'market'},
  {label: LG(lang.Limit), value: 'limit', disabled: true},
  {label: LG(lang.StopMarket), value: 'stopMarket', disabled: true},
  {label: 'TP/SL', value: 'tp/sl', disabled: true},
];
