import {css, styled} from 'styled-components';

export const StyledRecentWrap = styled.div<{$opened: boolean}>`
  transition: width 0.2s ease;
  ${({$opened}) => {
    if ($opened) {
      return css`
        width: 320px;
      `;
    }
    return css`
      width: 34px;
    `;
  }}
`;

export const StyledRecentContent = styled.div`
  background: var(--dense-blue);
  display: flex;
  &[hidden] {
    display: none;
  }
`;

export const StyledRecentHeader = styled.div`
  padding: 10px 16px;
  background: var(--golden);
`;

export const StyledButton = styled.div<{$opened: boolean}>`
  height: 60px;
  background: var(--dense-blue);
  clip-path: polygon(0 8px, 100% 0, 100% 0%, 100% 100%, 0px calc(100% - 8px));
  ${({$opened}) => {
    if (!$opened) {
      return css`
        i {
          transform: rotate(180deg);
        }
      `;
    }
  }}
`;
