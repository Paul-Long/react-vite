import {Banner} from '@/home-v2/Banner';
import {Delay} from '@/home-v2/Depay';
import {Footer} from '@/home-v2/Footer';
import {Header} from '@/home-v2/Header';
import {Loading} from '@/home-v2/Loading';
import {Powered} from '@/home-v2/Powered';
import {UnderlyingAsset} from '@/home-v2/UnderlyingAsset';
import {YieldMarket} from '@/home-v2/YieldMarket';
import {Features} from '@/home-v2/features/Features';
import {Innovations} from '@/home-v2/innovations';
import {useState} from 'react';
import {styled} from 'styled-components';

declare global {
  interface Window {
    lottie: any;
  }
}

const Wrap = styled.div`
  background: #09090a;
  font-family: PPNeueMachina, sans-serif, 'Helvetica Neue', Helvetica, PingFangSC, -apple-system,
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial;
  animation: slideInDown 0.4s forwards;

  .sv {
    scrollbar-width: thin;
    scrollbar-color: #09090a transparent;
  }

  .sv::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: transparent;
  }

  .sv:hover::-webkit-scrollbar-thumb {
    background-color: #09090a;
  }

  .sv::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

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
      <div className="bg-#09090a">
        <Header />
        <Delay delay={0.5}>
          <Banner />
          <Delay delay={2.5}>
            <Features />
            <YieldMarket />
            <UnderlyingAsset />
            <Innovations />
            <Powered />
            <Footer />
          </Delay>
        </Delay>
      </div>
    </Wrap>
  );
}
