import {styled} from 'styled-components';

export const Wrap = styled.div`
  height: 0;
  background-image: url('https://static.rate-x.io/img/v1/c32be6/dotsmask1.svg');
  background-size: 102%;
  background-repeat: no-repeat;
  animation: update-height 1.5s forwards;
  @keyframes update-height {
    to {
      height: 443px;
    }
  }
  @media (max-width: 640px) {
    @keyframes update-height {
      to {
        height: 186px;
      }
    }
  }
`;

export const Landing = styled.div<{$speed: string}>`
  position: absolute;
  left: 0;
  top: -100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: white;
  background-repeat: no-repeat;
  transition: top 1s ease-out;
`;
