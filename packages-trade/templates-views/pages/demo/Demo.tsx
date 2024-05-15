import {PerpMarketInfo} from '@/pages/demo/PerpMarketInfo';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {load} from '@rx/streams/market/reference-price';
import {kline$} from '@rx/streams/subscription/kline';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {markPrice$} from '@rx/streams/subscription/mark-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {tick$} from '@rx/streams/subscription/tick';
import {queryKLine$} from '@rx/streams/trade/kline';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {useEffect} from 'react';
import {AddKeeper} from './AddKeeper';
import {AddLiquidity} from './AddLiquidity';
import {AssetsCategory} from './AssetsCategory';
import {Deposit} from './Deposit';
import {InitializeUser} from './InitializeUser';
import {InitializeUserStats} from './InitializeUserStats';
import {Kline} from './Kline';
import {LastTradeSnapshot} from './LastTradeSnapshot';
import {MintBalance} from './MintBalance';
import {MintToUser} from './MintToUser';
import {PerpFillOrder} from './PerpFillOrder';
import {PerpPlaceOrder} from './PerpPlaceOrder';
import {RatePrice} from './RatePrice';
import {ReferenceRate} from './ReferenceRate';
import {UpdateOracle} from './UpdateOracle';
import {Withdraw} from './Withdraw';

export function Demo() {
  useEffect(() => {
    load().then();
    queryKLine$.next(0);
    queryRatePrice$.next(0);
    queryLastTrade$.next(0);
    tick$.next('dc.aps.ticker.msol');
    kline$.next('dc.md.kline.1M.mSOL-2406');
    markPrice$.next('dc.aps.markprice.mSOL');
    referencePrice$.next('dc.aps.referenceprice');
    lastTradeSnapshot$.next('dc.md.trade.mSOL-2406');
  }, []);

  return (
    <div className="flex flex-row justify-center w-100% gap-48px">
      <div className="flex flex-col items-center w-400px gap-32px">
        <InitializeUserStats />
        <InitializeUser />
        <PerpMarketInfo />
        <AddKeeper />
        <MintBalance />
        <PerpPlaceOrder />
        <PerpFillOrder />
        <AddLiquidity />
        <MintToUser />
        <Deposit />
        <Withdraw />
        <UpdateOracle />
      </div>
      <div className="df fdc aic w600px gap32px">
        <AssetsCategory />
        <RatePrice />
        <LastTradeSnapshot />
        <Kline />
        <ReferenceRate />
      </div>
    </div>
  );
}
