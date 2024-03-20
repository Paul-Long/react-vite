import {keyframes, styled} from 'styled-components';

const fadeIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

export const StyledOverlay = styled.div<{$open?: boolean}>`
  display: ${({$open}) => ($open ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  z-index: 1000;
`;

export const StyledContainer = styled.div<{$open?: boolean}>`
  background: var(--night-sky-blue);
  width: 240px;
  height: 100%;
  overflow-y: auto;
  z-index: 1001;
  animation: ${({$open}) => ($open ? fadeIn : fadeOut)} 0.5s ease;
`;
