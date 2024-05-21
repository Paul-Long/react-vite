import {HOME_IMAGES} from '@rx/const/images';
import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {clsx} from 'clsx';
import {useEffect, useRef} from 'react';
import data from './animation/slogan/data.json';

export function Footer() {
  return (
    <div className="flex flex-col sm:flex-row justify-between pt-80px w-full sm:max-w-1341px sm:mx-auto border-t-1px border-solid border-#2C2D2D pb-100px px-12px sm:px-0 gap-80px">
      <div className="flex flex-col items-start">
        <img className="h-24px lg:h-32px opacity-30 w-auto" src={HOME_IMAGES.LOGO} alt="" />
        <Animation />
      </div>
      <div className="flex flex-col items-start sm:justify-end sm:items-end gap-30px">
        <div className="flex flex-row items-center gap-30px">
          {medias.map((m) => (
            <img
              className={clsx('cursor-pointer', [m.title === 'discord' && 'opacity-30 scale-140'])}
              key={m.title}
              src={m.img}
              alt={m.title}
              width={28}
              height={28}
              onClick={() => !!m.link && window.open(m.link, '_blank', 'noopener')}
            />
          ))}
        </div>
        <div className="text-#F6F7F34C font-size-15px lh-15px">
          ©2024. Powered by Rate Labs Ltd. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export function Animation() {
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
        loop: false,
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
    <div ref={element} className="lottie w-326px max-w-full sm:w-286px sm:h-93px mt-30px"></div>
  );
}

const medias = [
  {
    title: 'twitter',
    img: 'https://static.rate-x.io/img/v1/1e3b0b/twitter.png',
    link: 'https://twitter.com/RateX_Dex',
  },
  {
    title: 'telegram',
    img: 'https://static.rate-x.io/img/v1/dd0342/telegram.png',
    link: 'https://t.me/RateXofficial',
  },
  {
    title: 'discord',
    img: 'https://static.rate-x.io/img/v1/eed951/discord.svg',
    link: 'https://discord.com/invite/DuhAc4UP5x',
  },
  {title: 'github', img: 'https://static.rate-x.io/img/v1/eb0ced/github.png'},
];
