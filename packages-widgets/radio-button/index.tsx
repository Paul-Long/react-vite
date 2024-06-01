import {clsx} from 'clsx';
import {ReactNode} from 'react';

interface Option {
  label: ReactNode;
  value: string;
}

type ChangeFunc = (v: string) => void;

interface Props {
  height?: number;
  value?: string;
  options: Option[];
  onChange?: ChangeFunc;
}
export function RadioButton(props: Props) {
  const {height = 44, options, onChange, value} = props;
  return (
    <div
      className={clsx('flex flex-row cursor-pointer rounded-4px')}
      style={{height, minHeight: height}}
    >
      {options.map((o) => (
        <div
          key={o.value}
          className={clsx(
            'flex-1 flex justify-center items-center text-center font-size-14px lh-16px text-wrap text-gray-600 bg-gray-40 transition-bg duration-100',
            [value === o.value && 'font-semibold text-white bg-gray-80']
          )}
          onClick={() => onChange?.(o.value)}
        >
          {o.label}
        </div>
      ))}
    </div>
  );
}
