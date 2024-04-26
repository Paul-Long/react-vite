import {AssetsCategory} from '@/home/AssetsCategory';
import {Banner} from '@/home/Banner';
import {Investors} from '@/home/Investors';
import {Mechanism} from '@/home/Mechanism';
import {YieldMarket} from '@/home/YieldMarket';
import {YieldSwap} from '@/home/YieldSwap';
import {StyledContent, StyledPage} from '@/home/styles';
import {useScroll} from '@rx/hooks/use-scroll';
import {Footer} from '@ssg/components/footer';
import {Header} from '@ssg/components/header';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

export function HomeTemplate() {
  const [show, setShow] = useState<boolean>(false);
  const {ref, isTop} = useScroll();

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
    <StyledPage
      className={clsx('overflow-auto w-100% h-100vh', [show && 'overflow-hidden'])}
      ref={ref}
    >
      <Header notScrollTop={!isTop} onMenuShow={(s) => setShow(s)} />
      <div className="w-100% overflow-hidden">
        <div className="relative w-1200px ml-auto mr-auto">
          <img
            className="rotate-animation hidden sm:block absolute left-10% top-[-160px] z-[-1]"
            src="//static.rate-x.io/img/v1/2160b9/home-bg-1.png"
            alt=""
            width={1920}
          />
          <img
            className="hidden sm:block absolute left-[-20%] top-1300px z-[-1] max-w-3108px transform-rotate-60deg"
            src="//static.rate-x.io/img/v1/2160b9/home-bg-1.png"
            alt=""
            width={3108}
          />
        </div>
        <StyledContent className="content relative w100% flex flex-col">
          <Banner />
          <YieldSwap />
          <YieldMarket />
          <AssetsCategory />
          <Mechanism />
          <div className="mx-auto mt-100px px-24px sm:px-0">
            <img
              className="w-672px max-w-100%"
              src="//static.rate-x.io/img/v1/b7df24/solana-foundation.png"
              alt="solana-foundation"
            />
          </div>
          <Investors />
          <Footer />
        </StyledContent>
      </div>
    </StyledPage>
  );
}
