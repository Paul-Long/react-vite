import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';

export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe({
      next: (v) => setValue(v),
      error: (err) => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done'),
    });

    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}
