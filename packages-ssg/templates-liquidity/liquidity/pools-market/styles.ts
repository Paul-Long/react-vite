import {styled} from 'styled-components';

export const StyledSquare = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid var(--golden);
  transform: rotate(45deg);
`;

export const StyledFiltersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  row-gap: 20px;
`;
