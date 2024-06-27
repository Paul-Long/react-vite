import {clsx} from 'clsx';
import React, {ReactNode} from 'react';
import {Spin} from '../loading/Spin';

interface Props {
  type?: 'primary' | 'default' | 'aqua' | 'yellow' | 'lime' | 'trade' | 'long' | 'short';
  size?: 'lg' | 'md' | 'sm';
  selected?: boolean;
  loading?: boolean;
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
    loading = false,
    ...otherProps
  } = props;
  return (
    <button
      className={clsx(
        'relative flex justify-center items-center flex-nowrap gap-8px rounded-2px box-border font-size-14px font-medium opacity-100 hover:opacity-80 active:opacity-80 disabled:opacity-80',
        'outline-none',
        [size === 'sm' && 'px-12px py-5px'],
        [size === 'md' && 'px-24px py-14px'],
        [type === 'primary' && !selected && 'bg-green-500 text-black'],
        [type === 'aqua' && !selected && 'bg-blue-500 text-black'],
        [type === 'yellow' && !selected && 'bg-yellow-500 text-black'],
        [type === 'lime' && !selected && 'bg-lime-500 text-black'],
        [type === 'trade' && !selected && 'bg-gray-500 text-#09090A'],
        [type === 'long' && !selected && 'bg-#0ecb81 text-white'],
        [type === 'short' && !selected && 'bg-#f6465d text-white'],
        [
          type === 'default' && 'bg-#1F1F21 text-gray-500 b-1px b-solid',
          [selected ? 'bg-#092C24 text-black b-green-500' : 'b-gray-80'],
        ],
        className
      )}
      {...otherProps}
    >
      {children}
      {loading && <Spin color={type === 'lime' ? '#1F1F2199' : '#8DCC2F99'} />}
    </button>
  );
}
