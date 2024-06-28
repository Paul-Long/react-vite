import {OverviewChart} from '@/views/account/OverviewChart';
import {PositionGrid} from '@/views/account/PositionGrid';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryRate$} from '@rx/streams/rate-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {ratePrice$} from '@rx/streams/subscription/rate-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {clsx} from 'clsx';
import {useEffect} from 'react';

export default function () {
  const {LG} = useLang();
  useEffect(() => {
    queryRatePrice$.next(0);
    queryRate$.next(0);
    ratePrice$.next('topic dc.trade.dprice');
    queryLastTrade$.next(0);
    lastTradeSnapshot$.next('dc.md.trade.*');
  }, []);
  return (
    <div
      className={clsx(
        'flex flex-col w-1200px max-w-screen mx-auto',
        'border-x-1px border-x-solid border-#2C2D2D'
      )}
    >
      <div className="font-size-16px lh-24px py-12px px-20px fw-medium text-gray-500 border-b-1px border-solid border-#2C2D2D">
        {LG(lang.Overview)}
      </div>
      <OverviewChart />
      <PositionGrid />
    </div>
  );
}
