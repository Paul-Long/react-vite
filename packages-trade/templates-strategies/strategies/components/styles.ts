import {css, styled} from 'styled-components';

export const StyledCardList = styled.div<{$minmax?: number}>`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
  ${({$minmax}) => {
    if ($minmax) {
      return css`
        grid-template-columns: repeat(auto-fit, minmax(${$minmax}px, 1fr));
      `;
    }
    return css`
      grid-template-columns: repeat(auto-fit, minmax(362px, 1fr));
    `;
  }}
  gap: 24px;
`;

export const StyledEarnMintForm = styled.div``;
