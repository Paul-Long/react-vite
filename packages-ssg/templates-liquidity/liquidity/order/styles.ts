import {css, styled} from 'styled-components';

export const StyledInputWrap = styled.div`
  padding: 12px 26px;
  border-radius: 6px;
  border: 1px solid var(--dark-gray);
  background: var(--night-sky-blue);
`;

export const StyledItemWrap = styled.div`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--dark-gray);
  background: var(--night-sky-blue);
`;

export const StyledBpsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) max-content;
`;

export const StyledBpsItem = styled.div<{$active: boolean}>`
  padding: 4px 8px;
  border-radius: 4px;
  background: #1f3244;
  cursor: pointer;
  ${({$active}) => {
    if ($active) {
      return css`
        color: var(--black);
        background: var(--golden);
      `;
    }
  }}
`;
