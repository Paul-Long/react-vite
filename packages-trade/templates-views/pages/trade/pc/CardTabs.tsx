import {clsx} from 'clsx';

type ChangeFunc = (v: string) => void;

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  value: string;
  options: Option[];
  onChange?: ChangeFunc;
}

export function CardTabs(props: Props) {
  const {className, value, options, onChange, size = 'md'} = props;
  return (
    <div
      className={clsx(
        'flex flex-row items-center flex-nowrap',
        [size === 'md' && 'gap-38px'],
        [size === 'sm' && 'gap-16px'],
        className
      )}
    >
      {options.map((o) => (
        <div
          key={o.value}
          onClick={() => !o.disabled && onChange?.(o.value)}
          className={clsx(
            'flex-1 flex justify-center text-nowrap items-center flex-nowrap cursor-pointer text-gray-600 font-medium font-size-14px lh-16px rounded-4px box-border px-12px py-6px',
            [value === o.value && 'text-white font-bold bg-gray-80'],
            [!!o.disabled && 'text-gray-80']
          )}
        >
          {o.label}
        </div>
      ))}
    </div>
  );
}
