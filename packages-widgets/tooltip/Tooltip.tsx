import clsx from 'clsx';
import React, {ReactNode, useRef, useState} from 'react';
import {styled} from 'styled-components';

const TooltipContainer = styled.div`
  position: fixed;
  padding: 10px;
  background: black;
  color: white;
  border-radius: 5px;
  display: block;
  z-index: 1000;
`;

const Trigger = styled.div`
  cursor: pointer;
`;

export const Tooltip = ({
  children,
  text,
  className,
}: {
  children: ReactNode;
  text: ReactNode;
  className?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({top: 0, left: 0});
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const calculatePosition = (
    rect: Record<string, any>,
    tooltipWidth: number,
    tooltipHeight: number
  ) => {
    const positions = {
      top: {top: rect.top - tooltipHeight - 5, left: rect.left + rect.width / 2 - tooltipWidth / 2},
      bottom: {top: rect.bottom + 5, left: rect.left + rect.width / 2 - tooltipWidth / 2},
      left: {
        top: rect.top + rect.height / 2 - tooltipHeight / 2,
        left: rect.left - tooltipWidth - 5,
      },
      right: {top: rect.top + rect.height / 2 - tooltipHeight / 2, left: rect.right + 5},
    };

    // Check for the best position here
    // This is a simple example, you might need more complex logic
    // to handle edge cases and screen sizes
    if (rect.top - tooltipHeight > 0) {
      return positions.top;
    } else if (window.innerWidth - rect.right > tooltipWidth) {
      return positions.right;
    } else if (rect.bottom + tooltipHeight < window.innerHeight) {
      return positions.bottom;
    } else {
      return positions.left;
    }
  };

  const handleMouseEnter = () => {
    if (!triggerRef.current) {
      return;
    }
    const rect = triggerRef.current?.getBoundingClientRect();
    const tooltipWidth = 200; // Approximate or calculate tooltip width
    const tooltipHeight = 50; // Approximate or calculate tooltip height
    const pos = calculatePosition(rect, tooltipWidth, tooltipHeight);
    setPosition(pos);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <React.Fragment>
      <Trigger ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </Trigger>
      {showTooltip && (
        <TooltipContainer className={clsx('tooltip', className)} style={position}>
          {text}
        </TooltipContainer>
      )}
    </React.Fragment>
  );
};
