import {css, styled} from 'styled-components';

export const StyledRadioButtonWrap = styled.div`
  width: 100%;
  color: var(--night-sky-blue);
  border: 1px solid var(--lead-gray);
  font-size: 16px;
`;

export const StyledRadioButton = styled.div<{
  $selected: boolean;
  $size: 'large' | 'middle' | 'small';
  $nowrap: boolean;
}>`
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

  ${({$size}) => {
    if ($size === 'large') {
      return css`
        padding: 14px 20px;
      `;
    }
    if ($size === 'middle') {
      return css`
        padding: 8px 12px;
      `;
    }
    return css`
      padding: 6px;
    `;
  }}
`;
