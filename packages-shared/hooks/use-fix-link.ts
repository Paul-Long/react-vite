import {useEffect, useState} from 'react';
import {fixLink$} from '@rx/streams/lang';

export function useFixLink() {
  const [fixLink, setFixLink] = useState(() => fixLink$.getValue());

  useEffect(() => {
    const unsubscription = fixLink$.subscribe((langFunc) => setFixLink(() => langFunc));
    return () => {
      unsubscription.unsubscribe();
    }
  }, []);

  return {fixLink};
}
