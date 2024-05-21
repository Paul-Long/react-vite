import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {useEffect, useRef} from 'react';
import data from './animation/mechanism_animation/data.json';

export function Innovations() {
  return (
    <div className="w-full mt-120px sm:mt-160px py-100px bg-#85C329 text-#09090A">
      <div className="flex flex-col sm:flex-row w-full sm:max-w-1341px sm:min-w-1341px mx-auto px-10px sm:px-0 gap-44px sm:gap-0">
        <Left />
        <Right />
      </div>
    </div>
  );
}

function Left() {
  return (
    <div className="flex-1 flex flex-col justify-center sm:pr-160px box-border">
      <Animation />
      <div className="font-size-28px lh-28px sm:font-size-48px sm:lh-48px mt-40px">
        Our Trading Mechanism Innovations
      </div>
      <div className="font-szie-15px lh-15px text-wrap text-#09090A4C mt-20px">
        We utilize advanced trading mechanisms like time-decay AMMs and reserve vaults to ensure
        optimal liquidity and efficient risk management. These innovations provide stability and
        reliability in yield trading.
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-row items-center border-1px border-solid border-#2C2D2D p-30px gap-20px sm:p-50px sm:pt-40px sm:gap-50px">
        <img
          className="w-120px h-120px"
          src="https://static.rate-x.io/img/v1/f7b489/time-decay-amm.svg"
          alt=""
        />
        <div className="flex flex-col">
          <img
            className="w-30px h-30px"
            src="https://static.rate-x.io/img/v1/cc7ca6/amm-1.svg"
            alt=""
          />
          <div className="font-size-20px lh-20px mt-28px">Time-Decay AMM</div>
          <div className="font-size-15px lh-15px text-#09090A4C mt-6px">
            Synthesized yield token with diminishing potential IL as it approaches expiration
          </div>
          <div className="font-size-15px lh-15px text-#09090A mt-12px">Learn more</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col py-20px px-12px sm:p-30px border-1px border-solid border-#202424 border-t-none">
          <img
            className="w-30px h-30px"
            src="https://static.rate-x.io/img/v1/925077/amm-2.svg"
            alt=""
          />
          <div className="font-size-20px lh-20px mt-28px">Reserve Vault</div>
          <div className="font-size-15px lh-15px text-#09090A4C mt-6px">
            Secure the payment of yield token and standard yield-bearing token
          </div>
          <div className="font-size-15px lh-15px text-#09090A mt-12px">Learn more</div>
        </div>
        <div className="flex flex-col py-20px px-12px sm:p-30px border-1px border-solid border-#202424 border-t-none border-l-none">
          <img
            className="w-30px h-30px"
            src="https://static.rate-x.io/img/v1/7a69ba/amm-3.svg"
            alt=""
          />
          <div className="font-size-20px lh-20px mt-28px">Multi-Layered Liquidity Pools</div>
          <div className="font-size-15px lh-15px text-#09090A4C mt-6px">
            Simultaneously provide liquidity for all the contracts with same underlying asset
          </div>
          <div className="font-size-15px lh-15px text-#09090A mt-12px">Learn more</div>
        </div>
      </div>
    </div>
  );
}

function Animation() {
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
    <div className="w-70px h-60px">
      <div ref={element} className="lottie w-full h-full"></div>
    </div>
  );
}
