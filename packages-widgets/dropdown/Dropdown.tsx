// Dropdown.tsx
import React, {CSSProperties, FunctionComponent, useEffect, useRef, useState} from 'react';
import {DropdownButton, DropdownContainer, DropdownContent} from './DropdownStyles';

interface DropdownProps {
  onChange?: (isOpen: boolean) => void;
  trigger?: 'click' | 'hover';
  contentStyle?: CSSProperties;
  content: JSX.Element;
  children: JSX.Element;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  onChange,
  trigger = 'click',
  contentStyle,
  content,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onChange?.(false);
      }
    };

    if (trigger === 'click') {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      if (trigger === 'click') {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, [trigger, onChange]);

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onChange?.(newIsOpen);
  };

  const handleMouseInteraction = (newIsOpen: boolean) => () => {
    if (trigger === 'hover') {
      setIsOpen(newIsOpen);
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={trigger === 'click' ? toggleDropdown : undefined}
        onMouseEnter={handleMouseInteraction(true)}
        onMouseLeave={trigger === 'hover' ? handleMouseInteraction(false) : undefined}
      >
        {children}
      </DropdownButton>
      <DropdownContent
        $isOpen={isOpen}
        style={contentStyle}
        onMouseEnter={handleMouseInteraction(true)}
        onMouseLeave={handleMouseInteraction(false)}
      >
        {content}
      </DropdownContent>
    </DropdownContainer>
  );
};
