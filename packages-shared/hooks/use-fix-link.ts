import {fixLink$} from '@rx/streams/lang';
import {useEffect, useState} from 'react';

export function useFixLink() {
  const [fixLink, setFixLink] = useState(() => fixLink$.getValue());

  useEffect(() => {
    const unsubscription = fixLink$.subscribe((langFunc: any) => setFixLink(() => langFunc));
    return () => {
      unsubscription.unsubscribe();
    };
  }, []);

  return {fixLink};
}
