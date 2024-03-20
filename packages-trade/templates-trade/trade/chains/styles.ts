import {css, styled} from 'styled-components';

export const Wrap = styled.div<{$show: boolean}>`
  height: 100%;
  border-right: 1px solid var(--slate-gray-blue);
  transition: all 0.1s ease;
  ${({$show}) => {
    if ($show) {
      return css`
        min-width: 150px;
        max-width: 150px;
      `;
    }
    return css`
      min-width: 42px;
      max-width: 42px;
    `;
  }}
`;

export const Content = styled.div`
  gap: 8px;
`;

export const StyledItem = styled.div<{$selected: boolean}>`
  line-height: 42px;
  padding: 0 12px;
  min-height: 42px;
  background-color: ${({$selected}) => ($selected ? 'var(--golden)' : 'initial')};
  color: ${({$selected}) => ($selected ? 'var(--black)' : 'var(--white)')};
  .right {
    transform: rotate(-90deg);
    display: ${({$selected}) => ($selected ? 'block' : 'none')};
  }
`;

export const StyledBottom = styled.div`
  padding: 10px 12px;
  border-top: 1px solid var(--dark-gray);
`;

export const SearchWrap = styled.div<{$show: boolean}>`
  width: 100%;
  box-sizing: border-box;
  margin-top: 24px;
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
