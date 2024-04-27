import {clsx} from 'clsx';
import {useCallback, useMemo} from 'react';

interface Option {
  label: string | number | JSX.Element;
  value: string | number;
}

type OnChange = (value: string | number) => void;

interface Props {
  value?: string | number;
  options: Option[];
  onChange?: OnChange;
}

export function Select(props: Props) {
  const {value, options, onChange} = props;

  const label = useMemo(() => options?.find((o) => o.value === value)?.label, [value, options]);

  const handleChange = useCallback((option: Option) => {
    onChange?.(option.value);
  }, []);

  return (
    <div className="group relative">
      <div className="flex flex-row items-center gap-4px cursor-pointer min-w-100px">
        <span className="font-size-24px lh-32px font-semibold">{label}</span>
        <i className="iconfont font-size-18px lh-18px text-gray-200 transform-rotate-180deg group-hover:transform-rotate-0 group-hover:mt-1px">
          &#xe967;
        </i>
      </div>
      <div className="hidden group-hover:flex absolute left-0 top-20px pt-16px w-auto z-10 max-w-none overflow-hidden ">
        <div className="p-16px font-size-16px text-gray-600 flex flex-col gap-16px rounded-8px bg-gray-80 backdrop-blur-24px shadow-lg ring-1 ring-gray-900/5">
          {options.map((o) => (
            <div
              key={o.value}
              onClick={() => handleChange(o)}
              className={clsx('flex-auto text-nowrap font-light hover:text-white cursor-pointer', [
                value === o.value && 'text-white',
              ])}
            >
              {o.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
