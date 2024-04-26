import {styled} from 'styled-components';

export const StyledWalletConnected = styled.div`
  display: inline-flex;
  & > img {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 640px) {
    padding: 10px 12px;
    & > img {
      width: 16px;
      height: 16px;
    }
    & > i {
      font-size: 14px;
    }
  }
`;
