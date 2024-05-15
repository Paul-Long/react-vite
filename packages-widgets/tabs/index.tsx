import {clsx} from 'clsx';
import {useEffect, useState} from 'react';

interface Option {
  text: string | JSX.Element;
  value: string;
  link?: string;
}

interface Props {
  className?: string;
  size?: 'lg' | 'sm';
  defaultValue?: string | number;
  value: string | number;
  onChange?: (tab: any) => void;
  options: Option[];
}

export function Tabs(props: Props) {
  const {size = 'lg', onChange, value, className = ''} = props;
  const [active, setActive] = useState<string | number>(props.defaultValue ?? props?.value ?? '');

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <div
      className={clsx(
        'flex flex-row items-center w-100% font-size-16px fw-400',
        [size === 'lg' && 'gap-50px'],
        [size === 'sm' && 'gap-32px'],
        className
      )}
    >
      {props.options?.map((o) => (
        <div
          key={o.value}
          onClick={() => onChange?.(o.value)}
          className={clsx(
            'flex justify-center items-center flex-nowrap text-nowrap h-100% b-style-solid text-gray-600 cursor-pointer box-border min-w-52px',
            [active === o.value && 'fw-500 text-white'],
            [active === o.value ? 'border-b-green-500' : 'b-b-transparent'],
            [size === 'lg' && 'b-b-4px'],
            [size === 'sm' && 'b-b-2px']
          )}
        >
          {o.text}
        </div>
      ))}
    </div>
  );
}
