import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {clsx} from 'clsx';
import {useEffect, useRef} from 'react';
import feature1 from './animation/feature1/data.json';
import feature2 from './animation/feature2/data.json';
import feature3 from './animation/feature3/data.json';

export function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:flex-row w-full sm:max-w-1341px mx-auto mt-80px">
      <Feature data={feature1} showLeft {...items.feature1} index={0}></Feature>
      <Feature
        data={feature2}
        className="border-t-none sm:border-t-1px sm:border-t-solid sm:border-l-none"
        {...items.feature2}
        index={1}
      ></Feature>
      <Feature
        data={feature3}
        className="border-t-none sm:border-t-1px sm:border-t-solid sm:border-l-none"
        {...items.feature3}
        index={1}
      ></Feature>
    </div>
  );
}

function Feature({data, showLeft, mobileShowLeft, title, desc, mDesc, className, index}: any) {
  const element = useRef(null);
  useEffect(() => {
    let anim: any;
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
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);
  return (
    <div className={clsx('flex flex-row px-10px sm:px-0 sm:flex-col gap-10px sm:gap-40px')}>
      <div
        className={clsx(
          'relative w-full min-w-186px max-w-186px h-186px sm:max-w-full sm:h-443px border-1px border-solid border-#2C2D2D',
          className
        )}
      >
        <Cross direction="tl" />
        <Cross direction="bl" />
        <Cross direction="tr" />
        <Cross direction="br" />
        <div ref={element} className="lottie w-full h-full"></div>
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

function Cross({className, direction}: any) {
  return (
    <div
      className={clsx(
        'absolute w-15px h-15px box-border z-1',
        [direction === 'tl' && 'top-[-8px] left-[-8px]'],
        [direction === 'bl' && 'bottom-[-8px] left-[-8px]'],
        [direction === 'tr' && 'top-[-8px] right-[-8px]'],
        [direction === 'br' && 'bottom-[-8px] right-[-8px]'],
        className
      )}
    >
      <img
        className="w-15px h-15px"
        src="https://static.rate-x.io/img/v1/360e32/cross.svg"
        alt=""
      />
      <div className="absolute top-5px left-5px w-5px h-5px bg-#09090A" />
    </div>
  );
}

const items = {
  feature1: {
    title: 'Trade Yield',
    desc: 'Engage in trading future yields to optimize your investment strategy. Whether aiming for profit or hedging against risks, our platform offers flexible trading options based on market trends and personal strategies.',
    mDesc: 'Engage in trading future yields to optimize your investment strategy.',
  },
  feature2: {
    title: 'Create Yield Asset',
    desc: 'Customize yield assets tailored to your needs and market conditions. Create personalized yield assets to diversify and strengthen your investment portfolio, making it more resilient and adaptable.',
    mDesc: 'Customize yield assets tailored to your needs and market conditions.',
  },
  feature3: {
    title: 'Build Strategy Vault',
    desc: 'Enhance your earnings with our Strategy Vaults. These intelligent vaults combine market data and advanced algorithms to help you achieve higher returns and effective risk management.',
    mDesc: 'Enhance your earnings with our Strategy Vaults.',
  },
};
