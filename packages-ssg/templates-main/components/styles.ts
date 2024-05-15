import {styled} from 'styled-components';

export const StyledPage = styled.div`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .rotate-animation {
    transform-origin: 60% 60%;
    animation: rotate 120s linear infinite;
  }
`;

export const StyledContent = styled.div`
  padding-top: 80px;
  min-height: 100%;
  background: #00000033;
  -webkit-backdrop-filter: blur(90px);
  backdrop-filter: blur(90px);

  @media (max-width: 640px) {
    background-image: url('//static.rate-x.io/img/v1/6efd61/home-bg-h5.png');
    background-size: 100% auto;
  }
`;
