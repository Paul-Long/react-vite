import {css, styled} from 'styled-components';

export const SearchWrap = styled.div<{$show: boolean}>`
  width: 100%;
  box-sizing: border-box;
  min-height: 30px;
  background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);

  img {
    position: absolute;
    display: inline-block;
    top: 6px;
    left: 6px;
    width: 16px;
    height: 16px;
    z-index: 1;
    ${({$show}) => {
      if (!$show) {
        return css`
          left: 10px;
        `;
      }
    }}
  }
`;

export const SearchInput = styled.input`
  height: 30px;
  padding-left: 30px;
  border: 1px solid var(--lead-gray);
  background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
`;
