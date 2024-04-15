import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import {auditTime, fromEvent, throttleTime} from 'rxjs';

export function useScroll<T extends HTMLDivElement>() {
  const ref: MutableRefObject<any> = useRef<T>();
  const [state, setState] = useState({
    isLeft: true,
    isRight: false,
    isTop: true,
    isBottom: false,
    hasX: false,
    hasY: false,
  });

  useEffect(() => {
    const scrollObservable = fromEvent(ref.current, 'scroll');
    const throttledScrollObservable = scrollObservable.pipe(throttleTime(100), auditTime(100));
    const subscription = throttledScrollObservable.subscribe(checkScroll);
    return () => {
      subscription.unsubscribe();
    };
  }, [ref.current]);

  const checkScroll = useCallback(() => {
    if (ref.current) {
      const {scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight} =
        ref.current;
      console.log(ref.current.scrollTop);
      setState({
        hasX: scrollWidth > clientWidth,
        hasY: scrollHeight > clientHeight,
        isTop: scrollTop === 0,
        isLeft: scrollLeft === 0,
        isRight: scrollLeft + clientWidth >= scrollWidth,
        isBottom: scrollTop + clientHeight >= scrollHeight,
      });
    }
  }, []);

  return {ref, ...state, checkScroll};
}
