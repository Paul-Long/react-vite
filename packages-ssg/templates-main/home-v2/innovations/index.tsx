import {MultiLayeredLiquidityPools} from '@/home-v2/innovations/MultiLayeredLiquidityPools';
import {ReserveVault} from '@/home-v2/innovations/ReserveVault';
import {TimeDecayAMM} from '@/home-v2/innovations/TimeDecayAMM';
import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {useEffect, useRef, useState} from 'react';
import data from '../animation/mechanism_animation/data.json';

export function Innovations() {
  return (
    <div className="relative w-full mt-120px sm:mt-160px py-100px bg-#85C329 text-#09090A">
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
        To empower the most secure and efficient yield trading experience, we've designed innovative
        mechanisms like Time-Decay AMM, Reserve Vaults, and Multi-Layered Liquidity Pools. These
        features deliver a unique experience and full control over yield trading.
      </div>
    </div>
  );
}

function Right() {
  const [inline, setInline] = useState(false);
  const [show, setShow] = useState('');
  useEffect(() => {
    setInline(document.body.offsetWidth > 640);
  }, []);
  return (
    <div className="flex-1 flex flex-col">
      <TimeDecayAMM inline={inline} show={show} onShow={setShow} />
      <div className="grid grid-cols-2">
        <ReserveVault inline={inline} show={show} onShow={setShow} />
        <MultiLayeredLiquidityPools inline={inline} show={show} onShow={setShow} />
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
