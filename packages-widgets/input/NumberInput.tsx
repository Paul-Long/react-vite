import classNames from 'classnames';
import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import {css, styled} from 'styled-components';

// Styled component for the input container
const StyledInputContainer = styled.div<{size: string; bordered: string; align: string}>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-sizing: border-box;
  ${({bordered}) =>
    bordered === 'true' &&
    css`
      border: 1px solid var(--lead-gray);
      &:hover,
      &:focus-within {
        border-color: #007bff;
      }
    `}

  .input {
    flex: 1;
    padding: 12px 0;
    border: none;
    border-radius: 4px;
    width: 100%;
    background: transparent;
    color: inherit;
    text-align: ${({align}) => align};
    &:hover,
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: var(--steel-gray);
    }
  }
`;

// Utility function to format the input value
const formatValue = (value: string, precision?: number, max?: number, min?: number): string => {
  if (!value) return '';
  let numValue = parseFloat(value as any);
  if (isNaN(numValue)) return '';

  numValue = parseFloat(numValue.toFixed(precision ?? 2));
  if (max !== undefined && numValue > max) numValue = max;
  if (min !== undefined && numValue < min) numValue = min;
  return numValue.toString();
};

// Props interface
interface NumberInputProps {
  size?: 'small' | 'medium' | 'large';
  prefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  precision?: number;
  max?: number;
  min?: number;
  disabled?: boolean;
  align?: 'left' | 'right' | 'center';
  bordered?: boolean;
  className?: string;
  inputClassName?: string;
  onChange?: (v: any) => void;
  value?: string | number;
  placeholder?: string | JSX.Element;
}

// Forward ref to the input element
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      size = 'medium',
      prefix,
      suffix,
      precision = 2,
      max,
      min,
      disabled = false,
      align = 'right',
      bordered = true,
      className,
      onChange,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
      setValue(props?.value as string);
    }, [props.value]);

    // Event handler for input changes
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatValue(event.target.value, precision, max, min);
        setValue(formattedValue);
      },
      [precision, max, min]
    );

    // Effect to format the value initially and on dependency changes
    useEffect(() => {
      setValue(formatValue(value as any, precision, max, min));
    }, [value, precision, max, min]);

    useEffect(() => onChange?.(value), [value]);

    return (
      <StyledInputContainer
        size={size}
        bordered={bordered?.toString()}
        align={align}
        className={classNames(className, {bordered})}
      >
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          placeholder={props.placeholder as any}
          ref={ref}
          type="text"
          className={'input ' + (inputClassName ?? '')}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          onWheel={(e) => e.currentTarget.blur()} // Prevents scrolling from changing the value
          pattern="\d*"
        ></input>
        {suffix && <span className="suffix">{suffix}</span>}
      </StyledInputContainer>
    );
  }
);
