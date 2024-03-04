import {Subject} from 'rxjs';
import {useCallback, useEffect, useState} from 'react';

export function useStream<T>(stream$: Subject<any>) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const subscription = stream$.subscribe((value) => {
      setData(value);
    });
    return function() {
      subscription.unsubscribe();
    }
  }, []);

  const update = useCallback((value: any) => stream$.next(value), []);

  return [data, update];
}
