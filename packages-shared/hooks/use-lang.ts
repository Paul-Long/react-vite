import {LG$} from '@rx/streams/lang';
import {useEffect, useState} from 'react';

export function useLang() {
  const [LG, setLG] = useState(() => LG$.getValue());

  useEffect(() => {
    const unsubscription = LG$.subscribe((langFunc: Function) => setLG(() => langFunc));
    return () => {
      unsubscription.unsubscribe();
    };
  }, []);

  return {LG};
}
