import {styled} from 'styled-components';

export const StyledPage = styled.div``;

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
  .line {
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

export const StyledYieldMarket = styled.div`
  .card:hover {
    .go-page {
      opacity: 1;
    }
  }
`;

export const StyledAssetsCategoryItem = styled.div<{$baseBg: any; $hoverBg: any}>`
  .icon {
    transition: all 0.2s ease;
    background-image: ${(props) => `url("${props.$baseBg}")`};
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &:hover {
    .icon {
      background-image: ${(props) => `url("${props.$hoverBg}")`};
    }
  }
`;
