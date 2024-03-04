// Button.tsx
import classNames from 'classnames';
import React, {CSSProperties} from 'react';
import {styled} from 'styled-components';

interface ButtonProps {
  type?: 'primary' | 'default';
  size?: 'small' | 'medium' | 'large' | number;
  width?: string | number;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  background: ${({type}) =>
    type === 'primary'
      ? 'blue'
      : 'linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%)'};
  color: ${({type}) => (type === 'default' ? 'var(--deep-sea-blue)' : 'var(--T1)')};
  border: ${({type}) => (type === 'default' ? '1px solid var(--lead-gray)' : 'none')};
  padding: 8px 12px;
  font-weight: bold;
  width: ${({width}) => (typeof width === 'number' ? `${width}px` : width || 'auto')};
  height: ${({size}) =>
    typeof size === 'number'
      ? `${size}px`
      : size === 'small'
      ? '32px'
      : size === 'medium'
      ? '42px'
      : '50px'};
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &[disabled] {
    background: var(--light-gray);
    opacity: 1;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'medium',
  width,
  className,
  disabled = false,
  children,
  ...props
}) => {
  const buttonClassNames = classNames(className);
  return (
    <StyledButton
      type={type}
      size={size}
      width={width}
      className={buttonClassNames}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
