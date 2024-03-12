import {useCallback, useEffect, useState} from 'react';
import {Subject} from 'rxjs';

export function useStream(stream$: Subject<any>) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const subscription = stream$.subscribe((value) => {
      setData(value);
    });
    return function () {
      subscription.unsubscribe();
    };
  }, []);

  const update = useCallback((value: any) => stream$.next(value), []);

  return [data, update];
}
