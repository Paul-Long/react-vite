import {clsx} from 'clsx';
import {ReactNode, useState} from 'react';

export const Tooltip = ({
  className,
  children,
  text,
  placement = 'top',
}: {
  className?: string;
  children: ReactNode;
  text: ReactNode;
  placement?: 'top' | 'bottom';
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {isTooltipVisible && (
        <div
          className={clsx(
            'absolute z-10 bg-black rounded-4px shadow-md left-1/2 transform -translate-x-1/2',
            [placement === 'top' && 'bottom-full mb-4px'],
            [placement === 'bottom' && 'top-full mt-4px']
          )}
        >
          <div
            className={clsx(
              'w-auto px-12px py-2px text-sm text-white bg-green-80',
              'border-1px border-solid border-gray-40 rounded-4px',
              className
            )}
            role="tooltip"
          >
            {text}
          </div>
          <div
            className={clsx(
              'absolute z-13 left-1/2 transform -translate-x-1/2 w-0 h-0',
              'border-4px border-solid border-transparent',
              [placement === 'top' && 'border-t-green-80  bottom-[-8px]'],
              [placement === 'bottom' && 'border-b-green-80  top-[-8px]']
            )}
          ></div>
        </div>
      )}
    </div>
  );
};
