import clsx from 'clsx';
import React, {cloneElement, ReactElement, ReactNode, useRef, useState} from 'react';
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
const TooltipContainer = styled.div<{$placement: Placement}>`
  position: fixed;
  padding: 10px;
  background: #2c2d2d;
  color: #f6f7f3;
  border-radius: 6px;
  display: block;
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

export const Tooltip = ({
  children,
  text,
  className,
  placement = 'top',
  showDelay = 0,
  hideDelay = 100,
  offset = 4,
}: {
  children: ReactElement;
  text: ReactNode;
  className?: string;
  placement?: Placement;
  showDelay?: number;
  hideDelay?: number;
  offset?: number;
}) => {
  const leaveTimer = useRef<any>(null);
  const enterTimer = useRef<any>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({top: 0, left: 0});
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const calculatePosition = (rect: Record<string, any>) => {
    const positions = {
      top: {top: rect.top - offset, left: rect.left + rect.width / 2},
      bottom: {top: rect.bottom + offset, left: rect.left + rect.width / 2},
      left: {top: rect.top + rect.height / 2, left: rect.left - offset},
      right: {top: rect.top + rect.height / 2, left: rect.right + offset},
      topLeft: {top: rect.top - offset, left: rect.left},
      topRight: {top: rect.top - offset, left: rect.right},
      bottomLeft: {top: rect.bottom + offset, left: rect.left},
      bottomRight: {top: rect.bottom + offset, left: rect.right},
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
      {cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {/*<Trigger ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>*/}
      {/*  {children}*/}
      {/*</Trigger>*/}
      {showTooltip &&
        createPortal(
          <TooltipContainer
            $placement={placement}
            className={clsx('tooltip', className)}
            style={position}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {text}
          </TooltipContainer>,
          document.body
        )}
    </React.Fragment>
  );
};
