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
  placement?: 'top' | 'bottom' | 'top-left';
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
            'absolute z-10 rounded-4px shadow-md',
            [placement === 'top' && 'bottom-full mb-4px  left-1/2 transform -translate-x-1/2'],
            [placement === 'bottom' && 'top-full mt-4px  left-1/2 transform -translate-x-1/2'],
            [placement === 'top-left' && 'bottom-full right-0']
          )}
        >
          <div
            className={clsx(
              'w-fit px-12px py-2px text-sm text-white bg-#2C2D2D',
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
              [placement === 'top' && 'border-#2C2D2D  bottom-[-8px]'],
              [placement === 'bottom' && 'border-#2C2D2D  top-[-8px]']
            )}
          ></div>
        </div>
      )}
    </div>
  );
};
