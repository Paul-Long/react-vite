import {DepositModal} from '@rx/components/wallet/DepositModal';
import {WithdrawModal} from '@rx/components/wallet/WithdrawModal';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {queryRate$} from '@rx/streams/rate-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {positionUpdate$} from '@rx/streams/subscription/position';
import {ratePrice$} from '@rx/streams/subscription/rate-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useEffect} from 'react';
import {TradePC} from './pc';

export default function () {
  const {address} = useConnect();
  useEffect(() => {
    queryLastTrade$.next(0);
    queryRatePrice$.next(0);
    queryRate$.next(0);
    ratePrice$.next('topic dc.aps.dprice');
    lastTradeSnapshot$.next('dc.md.trade.*');
    queryReferencePrice$.next(0);
  }, []);
  useEffect(() => {
    if (!!address) {
      positionUpdate$.next(`dc.trade.trade.*.*.${address}`);
    }
  }, [address]);
  return (
    <>
      <TradePC />
      <DepositModal />
      <WithdrawModal />
    </>
  );
}
