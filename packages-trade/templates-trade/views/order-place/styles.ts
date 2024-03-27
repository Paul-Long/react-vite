import {styled} from 'styled-components';

export const StyledOrderView = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 58px;
  .b-border {
    border-bottom: 1px solid var(--dark-gray);
  }
`;

export const StyledInputWrap = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--dark-gray);
  background: var(--night-sky-blue);
`;

export const StyledSubmitButton = styled.div`
  height: 42px;
  @media (max-width: 640px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
    padding: 20px 16px 0;
    background: var(--night-sky-blue);
  }
`;
