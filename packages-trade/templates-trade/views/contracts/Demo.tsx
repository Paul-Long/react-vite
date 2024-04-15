import {AssetsCategory} from '@/views/contracts/AssetsCategory';
import {Deposit} from '@/views/contracts/Deposit';
import {Kline} from '@/views/contracts/Kline';
import {LastTradeSnapshot} from '@/views/contracts/LastTradeSnapshot';
import {MintBalance} from '@/views/contracts/MintBalance';
import {MintToUser} from '@/views/contracts/MintToUser';
import {PerpFillOrder} from '@/views/contracts/PerpFillOrder';
import {PerpPlaceOrder} from '@/views/contracts/PerpPlaceOrder';
import {RatePrice} from '@/views/contracts/RatePrice';
import {ReferenceRate} from '@/views/contracts/ReferenceRate';
import {UpdateOracle} from '@/views/contracts/UpdateOracle';
import {StyledWrap} from '@/views/contracts/styles';
import {ConnectButton} from '@rx/components/wallet';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {load} from '@rx/streams/market/reference-price';
import {kline$} from '@rx/streams/subscription/kline';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {markPrice$} from '@rx/streams/subscription/mark-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {tick$} from '@rx/streams/subscription/tick';
import {queryKLine$} from '@rx/streams/trade/kline';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {MockMintToAccount} from '@rx/web3/components/MockMintToAccount';
import {useEffect} from 'react';
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
    <div className="df fdr jcc w100% gap48px">
      <div className="df fdc aic w400px gap32px">
        <StyledWrap className="df fdr jcfe">
          <ConnectButton />
        </StyledWrap>
        <MintBalance />
        <MockMintToAccount />
        <PerpPlaceOrder />
        <PerpFillOrder />
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
