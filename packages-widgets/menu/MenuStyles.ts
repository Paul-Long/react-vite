// MenuStyles.ts
import {styled} from 'styled-components';

interface StyledMenuItemProps {
  $size: 'small' | 'medium' | 'large';
  $selected: boolean;
}

const sizeMap: Record<StyledMenuItemProps['$size'], string> = {
  small: '24px',
  medium: '32px',
  large: '48px',
};

export const StyledMenuList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const StyledMenuItem = styled.li<StyledMenuItemProps>`
  display: flex;
  align-items: center;
  height: ${({$size}) => sizeMap[$size]};
  cursor: pointer;
  padding: 0 12px;
  border-radius: 8px;
  background-color: ${({$selected}) => ($selected ? '#e0e0e0' : 'transparent')};

  &:hover {
    background-color: #f2f2f2;
  }

  ${({$selected}) =>
    $selected &&
    `
    &:hover {
      background-color: #e0e0e0;
    }
  `}
`;
