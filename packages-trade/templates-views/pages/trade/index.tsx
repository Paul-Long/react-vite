import {DepositModal} from '@rx/components/wallet/DepositModal';
import {useObservable} from '@rx/hooks/use-observable';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {queryRate$} from '@rx/streams/rate-price';
import {positionUpdate$} from '@rx/streams/subscription/position';
import {ratePrice$} from '@rx/streams/subscription/rate-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {user$} from '@rx/streams/user';
import {useEffect} from 'react';
import {TradePC} from './pc';

export default function () {
  const user = useObservable<User | null>(user$, null);
  useEffect(() => {
    queryLastTrade$.next(0);
    queryRatePrice$.next(0);
    queryRate$.next(0);
    ratePrice$.next('topic dc.aps.dprice');
    queryReferencePrice$.next(0);
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
