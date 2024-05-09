import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';

export function useObservable<T>(observable: Observable<T>, initialValue: T, name?: string): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe((v: T) => {
      setValue(v);
    });
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}
