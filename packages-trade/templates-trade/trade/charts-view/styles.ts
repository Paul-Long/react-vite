import {css, styled} from 'styled-components';

export const StyledChartsViewWrap = styled.section`
  box-sizing: border-box;
  padding: 24px 0 16px 16px;
  overflow: hidden;
`;

export const StyledInfoWrap = styled.div``;

export const StyledInfoGrid = styled.div<{$row?: number}>`
  flex: 1;
  display: grid;
  ${({$row}) => {
    if (!$row) {
      return css`
        grid-template-columns: repeat(6, auto);
      `;
    }
    return css`
      grid-template-columns: repeat(${$row}, auto);
    `;
  }}
  gap: 10px;
`;

export const StyledCharts = styled.div`
  border: 1px solid var(--lead-gray);
`;

export const StyledChartsContainer = styled.div``;
