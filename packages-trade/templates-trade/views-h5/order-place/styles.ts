import {styled} from 'styled-components';

export const StyledH5OrderView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
  background: var(--night-sky-blue);
  padding-top: 108px;
  padding-bottom: 58px;
`;

export const StyledBackWrap = styled.div`
  position: fixed;
  top: 60px;
  left: 16px;
  right: 0;
  z-index: 101;
  padding: 20px 16px 12px;
  background: var(--night-sky-blue);
  display: flex;

  & i {
    transform: rotate(180deg);
  }
`;
