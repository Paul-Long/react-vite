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
  backdrop-filter: blur(90px);

  @media (max-width: 640px) {
    background-image: url('//static.rate-x.io/img/v1/6efd61/home-bg-h5.png');
    background-size: 100% auto;
  }
`;

export const StyledBanner = styled.div`
  width: 100%;
  .content {
    width: 1200px;
    max-width: 100%;
  }
`;

export const StyledLaunchApp = styled.div`
  color: #000;
  background: #14f195;
  padding: 16px;
`;

export const StyledYieldSwap = styled.div`
  width: 100%;
  .cards {
    width: 1296px;
    padding: 24px 48px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
  }
  .card {
    transition: all 0.2s ease-in;
  }
  .card:hover {
    margin-top: -12px;
    margin-bottom: 12px;
  }
`;
