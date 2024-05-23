import {Cross} from '@/home-v2/features/Cross';
import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {clsx} from 'clsx';
import {useEffect, useRef} from 'react';
import {styled} from 'styled-components';
import data from '../animation/feature2/data.json';

const Wrap = styled.div`
  height: 0;
  background-image: url('https://static.rate-x.io/img/v1/c32be6/dotsmask1.svg');
  background-size: 102%;
  background-repeat: no-repeat;
  animation: update-height 1s forwards;
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

const Landing = styled.div`
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: -120%;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: white;
    animation: slide-down 1.5s forwards ease-in-out;
  }
  @keyframes slide-down {
    0% {
      top: -120%;
    }
    50% {
      top: 0;
    }
    100% {
      top: 120%;
      display: none;
    }
  }
`;

export function Feature2({title, desc, mDesc, className, speed}: any) {
  const wrap = useRef<HTMLDivElement>(null);
  const element = useRef(null);
  const landing = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (landing.current) {
        landing.current.style.display = 'block';
        landing.current.style.top = '0';
        setTimeout(() => {
          if (wrap.current) {
            wrap.current.style.backgroundImage = 'none';
          }
        }, 1000);
      }
    }, 1000);
  }, [speed]);
  useEffect(() => {
    let anim: any;
    setTimeout(() => {
      loadLottie().then(() => {
        if (!env.isBrowser || !element.current) {
          return;
        }
        anim = window.lottie.loadAnimation({
          container: element.current, // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data,
        });
      });
    }, (1 + 0.9) * 1000);
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);
  return (
    <div className={clsx('flex flex-row px-10px sm:px-0 sm:flex-col gap-10px sm:gap-40px')}>
      <div className="relative w-full min-w-186px max-w-186px h-186px sm:max-w-full sm:h-443px ">
        <Wrap
          ref={wrap}
          className={clsx(
            'relative box-border w-full h-full',
            'border-1px border-solid border-#202424',
            className
          )}
        >
          <Cross direction="tl" />
          <Cross direction="bl" />
          <Cross direction="tr" />
          <Cross direction="br" />
          <Landing className="hidden absolute top-0 lef-0 w-full h-full" ref={landing} />
          <div ref={element} className="lottie  w-full h-full"></div>
        </Wrap>
      </div>
      <div className="flex flex-col gap-12px sm:pr-40px box-border">
        <div className="flex flex-row items-center flex-nowrap font-size-20px lh-20px sm:font-size-32px sm:lh-32px text-#F6F7F3 gap-8px mt-10px sm:mt-0">
          <div className="w-8px h-8px min-w-8px max-w-8px max-h-8px rounded-4px bg-#8DCC2F"></div>
          {title}
        </div>
        <p className="m-0 text-#F6F7F34C font-size-15px lh-18px hidden sm:block">{desc}</p>
        <p className="m-0 text-#F6F7F34C font-size-135x lh-18px block sm:hidden">{mDesc}</p>
      </div>
    </div>
  );
}
