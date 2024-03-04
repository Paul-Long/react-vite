import cn from 'classnames';
import React, {useCallback} from 'react';
import {css, styled} from 'styled-components';

const CheckboxContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const StyledCheckbox = styled.div<{$checked: boolean}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 1px;
  border: 1px solid var(--golden);
  ${({$checked}) => {
    if ($checked) {
      return css`
        background: var(--golden);
      `;
    }
  }}
`;

interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: string | JSX.Element;
}

export const Checkbox: React.FC<CheckboxProps> = ({className, checked, onChange, children}) => {
  const handleClick = useCallback(() => {
    onChange?.(!checked);
  }, [checked]);

  const checkboxClass = cn(className);

  return (
    <CheckboxContainer className={checkboxClass} onClick={handleClick}>
      <StyledCheckbox $checked={!!checked}>
        {checked && <i className={cn('iconfont font-size-14px mt-1px', {T1: checked})}>&#xe600;</i>}
      </StyledCheckbox>
      {children}
    </CheckboxContainer>
  );
};
