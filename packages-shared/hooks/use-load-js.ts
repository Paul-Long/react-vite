import {useEffect} from 'react';

export function useLoadJs(callback: () => void, [loadJs, other]) {
  useEffect(() => {
    let unCall;
    loadJs().then(() => {
      unCall = callback?.();
    });
    return () => unCall?.();
  }, [loadJs, ...(other || [])]);
}
