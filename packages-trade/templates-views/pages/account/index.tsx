import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryRate$} from '@rx/streams/rate-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {ratePrice$} from '@rx/streams/subscription/rate-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {useEffect} from 'react';
import {Overview} from './Overview';
import {PositionsWrap} from './positions';

export default function () {
  useEffect(() => {
    queryRatePrice$.next(0);
    queryRate$.next(0);
    ratePrice$.next('topic dc.trade.dprice');
    queryLastTrade$.next(0);
    lastTradeSnapshot$.next('dc.md.trade.*');
  }, []);
  return (
    <div className="flex flex-col w-1200px mx-auto">
      <Overview />
      <PositionsWrap />
    </div>
  );
}
