import {Key} from 'react';
import {css, styled} from 'styled-components';

export const StyledTableWrap = styled.div<{$rows: number; $grid?: string}>`
  display: grid;
  grid-template-columns: ${({$rows, $grid}) => $grid ?? `repeat(${$rows}, auto) max-content`};
  gap: 0;
`;

export const StyledRow = styled.div`
  display: contents;
  cursor: default;
  &:hover .td {
    background: var(--deep-sea-blue) !important;
  }
`;

const StyledCell = styled.div<{
  $align: 'right' | 'left' | 'center';
  $rowSpan?: number;
  $colSpan?: number;
  $fixed?: 'left' | 'right' | false;
  $selected?: boolean;
  children?: any;
  key?: Key;
  $shadowLeft?: boolean;
  $shadowRight?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  padding: 12px 20px;

  ${({$selected}) => {
    if ($selected) {
      return css`
        background: var(--deep-sea-blue);
      `;
    }
  }}

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

  ${({$shadowLeft, $shadowRight}) => {
    if ($shadowLeft) {
      return css`
        &::before {
          content: '';
          position: absolute;
          left: -10px;
          right: 100%;
          top: 0;
          bottom: 0;
          background: linear-gradient(to left, #00162b, transparent);
        }
      `;
    }
    if ($shadowRight) {
      return css`
        &::after {
          content: '';
          position: absolute;
          right: -10px;
          left: 100%;
          top: 0;
          bottom: 0;
          background: linear-gradient(to right, #00162b, transparent);
        }
      `;
    }
  }}

  padding: 12px 20px;
  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`;

export const StyledTh = styled(StyledCell)``;

export const StyledTd = styled(StyledCell)``;
