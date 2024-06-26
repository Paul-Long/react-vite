import {LeftArrowIcon} from '@rx/components/icons/LeftArrowIcon';
import clsx from 'clsx';
import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createPortal} from 'react-dom';
import {css, styled} from 'styled-components';

type Placement =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

const SelectContainer = styled.div<{$placement: Placement}>`
  position: fixed;
  padding: 2px 0;
  background: #131315;
  border: 1px solid #2c2d2d;
  color: #f6f7f3;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9000;
  transform: translate(-50%, -100%);
  ${({$placement}) => {
    switch ($placement) {
      case 'top':
        return css`
          transform: translate(-50%, -100%);
        `;
      case 'left':
        return css`
          transform: translate(-100%, -50%);
        `;
      case 'bottom':
        return css`
          transform: translate(-50%, 0%);
        `;
      case 'right':
        return css`
          transform: translate(0%, -50%);
        `;
      case 'topLeft':
        return css`
          transform: translate(0%, -100%);
        `;
      case 'topRight':
        return css`
          transform: translate(-100%, -100%);
        `;
      case 'bottomLeft':
        return css`
          transform: translate(0%, 0%);
        `;
      case 'bottomRight':
        return css`
          transform: translate(-100%, 0%);
        `;
      default:
        return css`
          transform: translate(-50%, -100%);
        `;
    }
  }}
`;

const Trigger = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

export const Select = ({
  value,
  options = [],
  className = '',
  placement = 'top',
  showDelay = 0,
  hideDelay = 100,
  onChange,
  background,
  border = true,
  triggerStyle = {},
  renderTrigger,
}: {
  value?: string | number;
  className?: string;
  placement?: Placement;
  showDelay?: number;
  hideDelay?: number;
  background?: boolean;
  border?: boolean;
  options: {label: ReactNode; value: string | number}[];
  onChange?: (value: string | number) => void;
  triggerStyle?: CSSProperties;
  renderTrigger?: (item: {label: ReactNode; value: string | number}) => ReactElement;
}) => {
  const leaveTimer = useRef<any>(null);
  const enterTimer = useRef<any>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({top: 0, left: 0});
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current?.offsetWidth);
    }
  }, []);

  const item = useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  const calculatePosition = (rect: Record<string, any>) => {
    const positions = {
      top: {top: rect.top - 4, left: rect.left + rect.width / 2},
      bottom: {top: rect.bottom + 4, left: rect.left + rect.width / 2},
      left: {top: rect.top + rect.height / 2, left: rect.left - 4},
      right: {top: rect.top + rect.height / 2, left: rect.right + 4},
      topLeft: {top: rect.top - 4, left: rect.left},
      topRight: {top: rect.top - 4, left: rect.right},
      bottomLeft: {top: rect.bottom + 4, left: rect.left},
      bottomRight: {top: rect.bottom + 4, left: rect.right},
    };
    return positions[placement];
  };

  const handleMouseEnter = () => {
    if (!triggerRef.current) {
      return;
    }
    const rect = triggerRef.current?.getBoundingClientRect();
    const pos = calculatePosition(rect);
    setPosition(pos);
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }
    if (!showTooltip) {
      enterTimer.current = setTimeout(() => {
        setShowTooltip(true);
        if (enterTimer.current) {
          clearTimeout(enterTimer.current);
        }
      }, showDelay);
    }
  };

  const handleMouseLeave = () => {
    if (showTooltip) {
      leaveTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, hideDelay);
    }
  };

  return (
    <React.Fragment>
      <div className="relative group">
        <Trigger ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div
            className={clsx(
              'inline-flex flex-row items-center px-12px py-6px gap-8px  box-border',
              [background && 'bg-#1F1F21'],
              [border && 'border-1px border-solid border-#2C2D2D'],
              className
            )}
            style={triggerStyle}
          >
            <div>{renderTrigger ? renderTrigger?.(item as any) : item?.label}</div>
            <LeftArrowIcon
              className="rotate-[-90deg] group-hover:rotate-90deg"
              width={16}
              height={16}
            />
          </div>
        </Trigger>
        {showTooltip &&
          createPortal(
            <SelectContainer
              $placement={placement}
              className={clsx('tooltip', className)}
              style={{...position, minWidth: width}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {options?.map((opt) => (
                <div
                  key={opt.value}
                  className="text-nowrap cursor-pointer py-8px px-10px hover:bg-#F6F7F319"
                  onClick={() => onChange?.(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
            </SelectContainer>,
            document.body
          )}
      </div>
    </React.Fragment>
  );
};
