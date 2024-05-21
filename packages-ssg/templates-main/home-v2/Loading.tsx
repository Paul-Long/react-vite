import {env} from '@rx/env';
import {loadLottie} from '@rx/resource/js';
import {clsx} from 'clsx';
import {useCallback, useEffect, useRef, useState} from 'react';
import {css, styled} from 'styled-components';
import data from './animation/loading/data.json';
import logoData from './animation/logo_animation/data.json';

const Wrap = styled.div<{$move: boolean}>`
  @keyframes slideOutRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  ${({$move}) => {
    if ($move) {
      return css`
        animation: slideOutRight 1s forwards;
      `;
    }
  }}
`;

export function Loading({onComplete}: any) {
  const [complete, setComplete] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadLottie().then(() => {
      setReady(true);
    });
  }, []);

  const handleComplete = useCallback(() => {
    setComplete(true);
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, []);

  const handleSkip = useCallback(() => {
    setComplete(true);
    setTimeout(() => {
      onComplete?.();
    }, 400);
  }, []);

  return (
    <Wrap
      $move={complete}
      onClick={handleSkip}
      className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center mx-auto bg-white"
    >
      <div
        className={clsx('absolute top-0 left-0 z-10 w-100px sm:w-400px h-full bg-#8DCC2F', [
          complete ? 'opacity-100' : 'opacity-0',
        ])}
      ></div>
      {ready && <IconLoading onComplete={handleComplete} />}
      {ready && <TimeLoading />}
    </Wrap>
  );
}

function TimeLoading() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let anim: any;
    if (!env.isBrowser || !element.current) {
      return;
    }
    element.current.style.opacity = '1';
    anim = window.lottie.loadAnimation({
      container: element.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: data,
    });
    setTimeout(() => {
      if (element.current) {
        element.current.style.opacity = '0';
      }
    }, 4000);
    return () => {
      if (anim) {
        anim.destroy(element.current);
      }
    };
  }, []);
  return (
    <div
      ref={element}
      className="lottie h-207px mt-100px opacity-100 transition-opacity duration-500"
    ></div>
  );
}

function IconLoading({onComplete}: any) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let anim: any;
    if (!env.isBrowser || !element.current) {
      return;
    }
    element.current.style.opacity = '1';
    anim = window.lottie.loadAnimation({
      container: element.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: logoData,
    });

    anim.addEventListener('complete', function () {
      if (element.current) {
        element.current.style.opacity = '0';
      }
      onComplete?.();
    });
    return () => {
      if (anim) {
        anim.destroy(element.current);
      }
    };
  }, []);
  return (
    <div ref={element} className="lottie h-207px mt-100px transition-opacity duration-500"></div>
  );
}
