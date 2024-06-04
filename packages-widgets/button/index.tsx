import {clsx} from 'clsx';
import React, {ReactNode} from 'react';

interface Props {
  type?: 'primary' | 'default' | 'aqua' | 'trade' | 'long' | 'short';
  size?: 'lg' | 'md' | 'sm';
  selected?: boolean;
  children?: ReactNode;
}
type ModifiedButtonAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & Props;

export function Button(props: ModifiedButtonAttributes) {
  const {
    children,
    type = 'primary',
    className = '',
    selected = false,
    size = 'sm',
    ...otherProps
  } = props;
  return (
    <button
      className={clsx(
        'flex justify-center items-center flex-nowrap gap-8px rounded-4px box-border font-size-14px font-medium opacity-100 hover:opacity-80 active:opacity-80 disabled:opacity-80',
        'outline-none',
        [size === 'sm' && 'px-12px py-5px'],
        [size === 'md' && 'px-24px py-12px'],
        [type === 'primary' && !selected && 'bg-green-500 text-black'],
        [type === 'aqua' && !selected && 'bg-blue-500 text-black'],
        [type === 'trade' && !selected && 'bg-white text-black'],
        [type === 'long' && !selected && 'bg-#0ecb81 text-white'],
        [type === 'short' && !selected && 'bg-#f6465d text-white'],
        [
          type === 'default' && 'bg-gray-80 text-white b-1px b-solid',
          [selected ? 'bg-#092C24 text-black b-green-500' : 'b-gray-80'],
        ],
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
