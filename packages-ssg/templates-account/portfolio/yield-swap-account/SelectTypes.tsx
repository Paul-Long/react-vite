import React, {useCallback, useState} from 'react';
import {css, styled} from 'styled-components';

export const StyledTypesWrap = styled.div`
  padding: 4px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
`;

export const StyledTypeItem = styled.div<{$active: boolean}>`
  padding: 2px 6px;
  min-width: 36px;
  color: var(--black);
  font-weight: 700;
  ${({$active}) => {
    if ($active) {
      return css`
        background: var(--golden);
      `;
    }
  }}
`;
export function SelectTypes({value, onChange}: {onChange?: Function; value?: string}) {
  const [type, setType] = useState<string>(value ?? 'YT');

  const handleClick = useCallback((t: string) => {
    setType(t);
    onChange?.(t);
  }, []);

  return (
    <StyledTypesWrap className="df fdr aic cp font-size-14px">
      <StyledTypeItem
        className="w40px df jcc aic"
        $active={type === 'YT'}
        onClick={() => handleClick('YT')}
      >
        yT
      </StyledTypeItem>
      <StyledTypeItem
        className="w40px df jcc aic"
        $active={type === 'IRS'}
        onClick={() => handleClick('IRS')}
      >
        IRS
      </StyledTypeItem>
    </StyledTypesWrap>
  );
}
