import {css, styled} from 'styled-components';

export const StyledHeader = styled.div<{$showBackground: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 24px;
  line-height: 32px;
  box-sizing: border-box;
  transition: background 0.1s ease;
  z-index: 1000;
  ${(props) => {
    if (props.$showBackground) {
      return css`
        backdrop-filter: blur(3px);
      `;
    }
  }}
`;

export const StyledContent = styled.div`
  width: 1200px;
  max-width: 100%;
`;

export const StyledH5Content = styled.div`
  background: #000;
  background-image: url('//static.rate-x.io/img/v1/6efd61/home-bg-h5.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center top;
`;
