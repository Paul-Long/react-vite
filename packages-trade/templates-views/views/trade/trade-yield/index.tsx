import {AssetSelect} from '@/views/trade/trade-yield/AssetSelect';
import {MarketGrid} from '@/views/trade/trade-yield/MarketGrid';
import {PositionWrap} from '@/views/trade/trade-yield/PositionWrap';
import {TradingViewChart} from '@/views/trade/trade-yield/TradingViewChart';
import {PlaceOrder} from '@/views/trade/trade-yield/place-order';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {queryRate$} from '@rx/streams/rate-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {ratePrice$} from '@rx/streams/subscription/rate-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {marketIndex$} from '@rx/web3/streams/balance';
import {useEffect} from 'react';

export default function () {
  useEffect(() => {
    queryLastTrade$.next(0);
    queryRatePrice$.next(0);
    queryRate$.next(0);
    ratePrice$.next('topic dc.trade.dprice');
    lastTradeSnapshot$.next('dc.md.trade.*');
    queryReferencePrice$.next(0);
    marketIndex$.next(-1);
  }, []);
  return (
    <div className="w-full h-full flex-1 flex">
      <AssetSelect />
      <div className="flex-1">
        <MarketGrid />
        <TradingViewChart />
        <PositionWrap />
      </div>
      <PlaceOrder />
    </div>
  );
}
