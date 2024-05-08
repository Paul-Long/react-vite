import {useStream} from '@rx/hooks/use-stream.ts';
import {useEffect, useState} from 'react';
import {clientReady$, rateXClient$} from '../streams/rate-x-client.ts';

export function useUserOrders() {
  const [client] = useStream(rateXClient$);
  const [data, setData] = useState<any[]>([]);

  const query = async () => {
    const positions = await client?.getAllOrders();
    console.log('All Positions : ', positions, client);
    setData(positions ?? []);
  };

  useEffect(() => {
    let timer: any;
    const subscription = clientReady$.subscribe((r: boolean) => {
      if (r) {
        if (timer) {
          clearInterval(timer);
        }
        timer = setInterval(() => query(), 60 * 1000);
        query();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [client]);

  return {data, query};
}
