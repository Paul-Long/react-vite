import {styled, css} from 'styled-components';

export const StyledRadioButtonWrap = styled.div<{$size: 'large' | 'small'}>`
  width: 100%;
  color: var(--night-sky-blue);
  border: 1px solid var(--lead-gray);
  font-size: 16px;
`;

export const StyledRadioButton = styled.div<{$selected: boolean}>`
  padding: 6px 20px;
  height: 100%;
  background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);
  text-align: center;
  ${({$selected}) =>
    $selected
      ? css`
          background: var(--golden);
        `
      : css`
          background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);
        `}
`;
