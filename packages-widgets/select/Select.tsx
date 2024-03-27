import classNames from 'classnames';
import React, {Key, useEffect, useRef, useState} from 'react';
import {css, styled} from 'styled-components';

// Styled components for the select box and options list
const SelectContainer = styled.div<{size: string}>`
  position: relative;
  font-size: ${({size}) => {
    switch (size) {
      case 'small':
        return '0.8rem';
      case 'large':
        return '1.2rem';
      default:
        return '1rem';
    }
  }};
`;

const SelectBox = styled.div<{$size: string; $showBackground: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  gap: 12px;
  cursor: pointer;
  ${({$showBackground}) => {
    if ($showBackground) {
      return css`
        color: var(--night-sky-blue);
        border: 1px solid var(--lead-gray);
        background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);
      `;
    }
    return css`
      color: var(--white);
    `;
  }}
`;

const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  color: var(--night-sky-blue);
  border: 1px solid var(--lead-gray);
  background: var(--dark-blue);
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const OptionItem = styled.li`
  padding: 6px 12px;
  cursor: pointer;
  background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);

  &:hover {
    background: var(--golden);
  }
`;

const DownIcon = styled.i<{$show: boolean; $showBackground: boolean}>`
  transform: rotate(${({$show}) => ($show ? '180deg' : '0deg')});
  ${({$showBackground}) => {
    if ($showBackground) {
      return css`
        color: var(--black);
      `;
    }
    return css`
      color: var(--golden);
    `;
  }}
`;

// Option interface
interface Option {
  label: string;
  value: any;
}

// Props interface
interface SelectProps {
  size?: 'small' | 'medium' | 'large';
  options: Option[];
  className?: string;
  onChange?: (value: any) => void;
  value?: Key;
  align?: 'left' | 'right' | 'center';
  showBackground?: boolean;
  placeholder?: string;
}

// Select component
export const Select: React.FC<SelectProps> = (props) => {
  const {
    size = 'medium',
    options,
    className,
    onChange,
    value,
    align = 'center',
    showBackground = true,
    placeholder,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside handler
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectRef]);

  useEffect(() => {
    if (value !== selectedOption?.value) {
      const option: any = options.find((o) => o.value === value);
      setSelectedOption(option);
    }
  }, [value]);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <SelectContainer size={size} ref={selectRef} className={classNames(className)}>
      <SelectBox $size={size} $showBackground={showBackground} onClick={() => setIsOpen(!isOpen)}>
        <div className="f1 text-nowrap pl8px" style={{textAlign: align}}>
          {selectedOption ? selectedOption.label : placeholder ?? ''}
        </div>
        <DownIcon
          $showBackground={showBackground}
          className="db iconfont font-size-12px mr6px"
          $show={isOpen}
        >
          &#xe624;
        </DownIcon>
      </SelectBox>
      {isOpen && (
        <OptionsList className="df fdc">
          {options.map((option, index) => (
            <OptionItem
              style={{textAlign: align}}
              key={index}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};
