import {clsx} from 'clsx';
import {ReactNode, useCallback, useMemo} from 'react';

interface Option {
  label: ReactNode;
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
    <div className="group relative shrink-0">
      <div className="flex shrink-0 flex-row items-center font-size-14px lh-24px font-semibold gap-8px cursor-pointer flex-nowrap text-nowrap">
        {label}
        <i className="block iconfont font-size-10px lh-10px text-white transform-rotate-90deg group-hover:rotate-[-90deg] group-hover:mt-1px">
          &#xe63c;
        </i>
      </div>
      <div className="hidden group-hover:flex absolute left-0 top-20px pt-16px w-auto z-10 max-w-none overflow-hidden ">
        <div className="p-16px font-size-16px text-gray-600 flex flex-col gap-16px rounded-8px bg-gray-80 backdrop-blur-24px shadow-lg ring-1 ring-gray-900/5">
          {options?.map((o) => (
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
