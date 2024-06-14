import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {clsx} from 'clsx';
import {useEffect, useRef, useState} from 'react';
import data from './animation/slogan/data.json';

export function Banner() {
  const element = useRef(null);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    setComplete(false);
    let anim: any;
    loadLottie().then(() => {
      if (!env.isBrowser || !element.current) {
        return;
      }
      anim = window.lottie.loadAnimation({
        container: element.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: data,
      });
      anim.setSpeed(2);
      setTimeout(() => {
        setComplete(true);
      }, 2000);
    });
    return () => {
      if (anim) {
        anim.destroy(element.current);
      }
    };
  }, []);
  return (
    <div className="flex flex-col items-start w-full px-12px sm:max-w-1341px sm:mx-auto gap-40px">
      <div
        ref={element}
        className="lottie flex justify-start w-326px max-w-full sm:w-640px  sm:h-207px mt-100px"
      ></div>
      <div
        className={clsx('flex flex-col gap-20px transition-opacity ease-in duration-300', [
          complete ? 'opacity-100' : 'opacity-0',
        ])}
      >
        <div className={clsx('font-size-20px lh-20px text-#8DCC2F')}>
          World’s 1st leveraged Synthetic Yield exchange!
        </div>
        <div
          className={clsx(
            'flex flex-row items-center flex-nowrap text-nowrap gap-12px mt-20px font-size-24px lh-32px'
          )}
          onClick={() => window.open('https://app-testnet.rate-x.io/trade', '_blank', 'noopener')}
        >
          Launch App
          <img
            className="w-32px h-32px"
            src="https://static.rate-x.io/img/v1/2f71a0/left.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
