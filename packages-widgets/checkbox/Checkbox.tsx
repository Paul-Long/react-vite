import {clsx} from 'clsx';
import {ReactNode} from 'react';

interface Props {
  value: boolean;
  onChange?: (v: boolean) => void;
  children?: ReactNode;
  className?: string;
}
export function Checkbox(props: Props) {
  const {value, onChange, children, className = 'text-gray-600'} = props;
  return (
    <div
      className={clsx('flex flex-row items-center text-nowrap gap-8px cursor-pointer', className)}
    >
      {!value && <i className="iconfont">&#xe82c;</i>}
      {value && <i className="iconfont text-green-500">&#xe7d7;</i>}
      {children}
    </div>
  );
}
