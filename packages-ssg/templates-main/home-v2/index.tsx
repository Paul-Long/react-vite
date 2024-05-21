import {Banner} from '@/home-v2/Banner';
import {Delay} from '@/home-v2/Depay';
import {Features} from '@/home-v2/Features';
import {Footer} from '@/home-v2/Footer';
import {Header} from '@/home-v2/Header';
import {Innovations} from '@/home-v2/Innovations';
import {Loading} from '@/home-v2/Loading';
import {Powered} from '@/home-v2/Powered';
import {UnderlyingAsset} from '@/home-v2/UnderlyingAsset';
import {YieldMarket} from '@/home-v2/YieldMarket';
import {useState} from 'react';
import {styled} from 'styled-components';

declare global {
  interface Window {
    lottie: any;
  }
}

const Wrap = styled.div`
  background: #09090a;
  @font-face {
    font-family: 'PPNeueMachina';
    font-style: normal;
    font-display: swap;
    src: url('https://static.rate-x.io/font/v1/poppins/PPNeueMachina-InktrapLight.woff2')
      format('woff2');
  }
  font-family: PPNeueMachina, sans-serif, 'Helvetica Neue', Helvetica, PingFangSC, -apple-system,
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial;
  animation: slideInDown 1s forwards;

  @keyframes slideInDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default function () {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <Loading onComplete={() => setLoading(false)} />;
  }
  return (
    <Wrap className="flex flex-col w-full h-full sm:min-w-1381px">
      <Header />
      <Delay delay={1}>
        <Banner />
        <Delay delay={2}>
          <Features />
          <YieldMarket />
          <UnderlyingAsset />
          <Innovations />
          <Powered />
          <Footer />
        </Delay>
      </Delay>
    </Wrap>
  );
}
