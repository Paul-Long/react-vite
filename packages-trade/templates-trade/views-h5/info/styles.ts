import {styled} from 'styled-components';

export const StyledInfoWrap = styled.div<{$count: number}>`
  display: grid;
  grid-template-columns: repeat(${({$count}) => $count}, auto) max-content;
  background: var(--dense-blue);
  border-radius: 4px;
`;
