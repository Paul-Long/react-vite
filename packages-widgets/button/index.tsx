import {clsx} from 'clsx';
import React, {ReactNode} from 'react';

interface Props {
  type?: 'primary' | 'default' | 'aqua';
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
    size = 'md',
    ...otherProps
  } = props;
  return (
    <button
      className={clsx(
        'flex justify-center items-center flex-nowrap gap-8px px-12px py-6px rounded-4px box-border font-size-14px font-medium opacity-100 hover:opacity-80 active:opacity-90',
        [size === 'sm' && 'px-12px py-6px'],
        [size === 'md' && 'px-24px py-12px'],
        [type === 'primary' && !selected && 'bg-green-500 text-black'],
        [type === 'aqua' && !selected && 'bg-blue-500 text-black'],
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
