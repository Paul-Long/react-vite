import {styled} from 'styled-components';

export const StyledAssetWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 8px;
`;

export const StyledAssetItem = styled.div<{$selected: boolean}>`
  box-sizing: border-box;
  min-width: 60px;
  padding: 8px 16px;
  background: ${({$selected}) => ($selected ? 'var(--golden)' : 'var(--deep-space-blue)')};
  color: ${({$selected}) => ($selected ? 'var(--black)' : 'var(--white)')};
  border-radius: 4px;
`;
