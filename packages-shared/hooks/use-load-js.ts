import {useEffect} from 'react';

export function useLoadJs(callback: () => void, [loadJs, other]: [loadJs: Function, other: any[]]) {
  useEffect(() => {
    let unCall: any;
    loadJs().then(() => {
      unCall = callback?.();
    });
    return () => unCall?.();
  }, [loadJs, ...(other || [])]);
}
