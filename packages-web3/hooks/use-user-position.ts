import {RateXClosePositionParams} from '@/types/rate-x-client';
import {BN} from '@coral-xyz/anchor';
import {useStream} from '@rx/hooks/use-stream.ts';
import {useEffect, useState} from 'react';
import {clientReady$, rateXClient$} from '../streams/rate-x-client.ts';

interface Position {
  baseAssetAmount: BN | number;
  lastRate?: BN | number;
  marketIndex: number;
  quoteAssetAmount: BN | number;
}

export function useUserPosition() {
  const [client] = useStream(rateXClient$);
  const [data, setData] = useState<Position[]>([]);

  useEffect(() => {
    let timer: any;
    const subscription = clientReady$.subscribe((r: boolean) => {
      if (r) {
        if (timer) {
          clearInterval(timer);
        }
        // timer = setInterval(() => query(), 60 * 1000);
        query().then();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [client]);

  const query = async () => {
    const positions = await client?.getAllPositions();
    console.log('All Positions : ', positions, client);
    setData(positions ?? []);
  };

  const closePosition = async (params: RateXClosePositionParams) => {
    await client?.closePosition(params);
  };
  return {query, data, closePosition, client};
}
