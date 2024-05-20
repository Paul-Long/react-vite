import {Header} from '@/home-v2/Header';
import {useEffect} from 'react';
import {styled} from 'styled-components';

const Wrap = styled.div`
  background: #09090a;
  @font-face {
    font-family: 'PPNeueMachina';
    font-style: normal;
    font-display: swap;
    src: url(https://static.rate-x.io/font/v1/poppins/PPNeueMachina-PlainRegular.woff2)
      format('woff2');
  }
  font-family: PPNeueMachina, sans-serif, 'Helvetica Neue', Helvetica, PingFangSC, -apple-system,
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial;
`;

export default function () {
  useEffect(() => {
    const loadingEle: HTMLElement | null = document.getElementById('page-loading');
    if (loadingEle) {
      loadingEle.style.transition = 'opacity 0.2s';
      loadingEle.style.opacity = '0';
      setTimeout(() => {
        loadingEle?.parentNode?.removeChild(loadingEle);
      }, 200);
    }
  }, []);
  return (
    <Wrap className="flex flex-col w-full h-full">
      <Header />
    </Wrap>
  );
}
