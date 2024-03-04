// DropdownStyles.ts
import {styled} from 'styled-components';

interface DropdownContentProps {
  $isOpen: boolean;
}

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.div`
  cursor: pointer;
`;

export const DropdownContent = styled.div<DropdownContentProps>`
  display: ${({$isOpen}) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 8px;
  border-radius: 4px;
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({$isOpen}) => ($isOpen ? 1 : 0)};
  transform: translateY(${({$isOpen}) => ($isOpen ? '0' : '-10px')});
  pointer-events: ${({$isOpen}) =>
    $isOpen ? 'auto' : 'none'}; // Prevent mouse events when not visible
`;
