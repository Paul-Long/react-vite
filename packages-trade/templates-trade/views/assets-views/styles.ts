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
