import {DepositModal} from '@rx/components/wallet/DepositModal.tsx';
import {useObservable} from '@rx/hooks/use-observable.ts';
import {positionUpdate$} from '@rx/streams/subscription/position.ts';
import {queryLastTrade$} from '@rx/streams/trade/last-trade.ts';
import {user$} from '@rx/streams/user.ts';
import {useEffect} from 'react';
import {TradePC} from './pc';

export default function () {
  const user = useObservable<User | null>(user$, null);
  useEffect(() => {
    queryLastTrade$.next(0);
  }, []);
  useEffect(() => {
    if (!!user?.userId) {
      positionUpdate$.next(`dc.trade.trade.*.*.${user.name}`);
    }
  }, [user]);
  return (
    <>
      <TradePC />
      <DepositModal />
    </>
  );
}
