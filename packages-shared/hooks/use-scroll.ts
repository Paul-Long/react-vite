import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';

export function useScroll<T extends HTMLDivElement>() {
  const ref: MutableRefObject<any> = useRef<T>();
  const [isLeft, setIsLeft] = useState(true);
  const [isRight, setIsRight] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const [hasX, setHasX] = useState(false);
  const [hasY, setHasY] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener('scroll', checkScroll);
    return () => {
      ref.current?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const checkScroll = useCallback(() => {
    if (ref.current) {
      const {scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight} =
        ref.current;
      setHasX(scrollWidth > clientWidth);
      setHasY(scrollHeight > clientHeight);
      setIsRight(scrollLeft + clientWidth >= scrollWidth);
      setIsLeft(scrollLeft === 0);
      setIsTop(scrollTop === 0);
      setIsBottom(scrollTop + clientHeight >= scrollHeight);
    }
  }, []);

  return {ref, isLeft, isRight, isTop, isBottom, hasX, hasY};
}
