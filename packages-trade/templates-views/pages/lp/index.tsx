import {Filters} from '@/pages/lp/Filters';
import {SpecificPool} from '@/pages/lp/SpecificPool';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {markPrice$} from '@rx/streams/subscription/mark-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {useEffect} from 'react';

export default function () {
  useEffect(() => {
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
    queryLastTrade$.next(0);
    lastTradeSnapshot$.next('dc.md.trade.*');
    queryRatePrice$.next(0);
    markPrice$.next('dc.aps.markprice.*');
  }, []);
  return (
    <div className="flex flex-col w-1200px mx-auto">
      <Filters />
      <SpecificPool />
    </div>
  );
}
