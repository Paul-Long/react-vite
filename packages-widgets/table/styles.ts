import {css, styled} from 'styled-components';

export const StyledTableWrap = styled.div<{$rows: number}>`
  display: grid;
  grid-template-columns: ${({$rows}) => `repeat(${$rows}, auto) max-content`};
  gap: 0;
`;

export const StyledRow = styled.div`
  display: contents;
  &:hover {
    background: var(--light-gray);
  }
`;

const StyledCell = styled.div<{
  $align: 'right' | 'left' | 'center';
  $rowSpan?: number;
  $colSpan?: number;
  $fixed?: 'left' | 'right';
  children?: any;
  key?: Key;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  padding: 12px 20px;

  ${({$align}) => {
    if ($align === 'right') {
      return css`
        align-items: flex-end;
      `;
    } else if ($align === 'center') {
      return css`
        align-items: center;
      `;
    }
    return css`
      align-items: flex-start;
    `;
  }}

  ${({$fixed}) => {
    if ($fixed === 'left') {
      return css`
        position: sticky;
        left: 0;
        z-index: 11;
        padding-left: 20px;
      `;
    }
    if ($fixed === 'right') {
      return css`
        position: sticky;
        right: 0;
        z-index: 11;
        padding-right: 20px;
      `;
    }
  }}

  ${({$colSpan}) => $colSpan && `grid-col: span ${$colSpan}`};
  ${({$rowSpan}) => $rowSpan && `grid-template-rows: auto;`};
  ${({$rowSpan}) => $rowSpan && `grid-row: span ${$rowSpan};`};
`;

export const StyledTh = styled(StyledCell)``;

export const StyledTd = styled(StyledCell)``;
