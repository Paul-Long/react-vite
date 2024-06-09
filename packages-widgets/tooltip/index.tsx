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
            'absolute z-10 bg-black rounded-md shadow-md left-1/2 transform -translate-x-1/2',
            'border-1px border-solid border-gray-80',
            [placement === 'top' && 'bottom-full mb-2'],
            [placement === 'bottom' && 'top-full mt-2']
          )}
        >
          <div
            className={clsx(
              'w-auto px-12px py-2px text-sm text-white bg-gray-80 rounded-md',
              className
            )}
            role="tooltip"
          >
            {text}
            {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 mb-[-6px] w-3 h-3 bg-black rotate-45" /> */}
          </div>
        </div>
      )}
    </div>
  );
};
