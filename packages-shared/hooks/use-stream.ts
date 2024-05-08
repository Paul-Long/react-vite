import {useCallback, useEffect, useState} from 'react';
import {BehaviorSubject, Subject} from 'rxjs';

export function useStream<T extends any>(stream$: Subject<T> | BehaviorSubject<T>) {
  const [data, setData] = useState<T>((stream$ as any).getValue());

  useEffect(() => {
    const subscription = stream$.subscribe((value: T) => {
      setData(value);
    });
    return function () {
      subscription.unsubscribe();
    };
  }, []);

  const update: any = useCallback((value: T) => {
    stream$?.next(value);
  }, []);

  return [data, update];
}
