import {marketIndex$} from '@/streams/lp/positions';
import {Detail} from '@/views/trade/liquidity-slp/Detail';
import {Header} from '@/views/trade/liquidity-slp/Header';
import {LivePosition} from '@/views/trade/liquidity-slp/LivePosition';
import {PlaceOrder} from '@/views/trade/liquidity-slp/PlaceOrder';
import {PositionPlaceOrder} from '@/views/trade/liquidity-slp/PositionPlaceOrder';
import {ResidualPosition} from '@/views/trade/liquidity-slp/ResidualPosition';
import {LeftArrowIcon} from '@rx/components/icons/LeftArrowIcon';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useObservable} from '@rx/hooks/use-observable';
import {contracts$} from '@rx/streams/config';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {ratePrice$} from '@rx/streams/subscription/rate-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {lastTrade$, queryLastTrade$} from '@rx/streams/trade/last-trade';
import {clsx} from 'clsx';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

export default function () {
  const {detail} = useData();
  const navigate = useNavigate();
  const {fixLink} = useFixLink();
  const [tab, setTab] = useState<string>('Detail');

  useEffect(() => {
    queryRatePrice$.next(0);
    queryReferencePrice$.next(0);
    ratePrice$.next('topic dc.trade.dprice');
    referencePrice$.next('dc.aps.referenceprice');
    queryLastTrade$.next(0);
    lastTradeSnapshot$.next('dc.md.trade.*');
  }, []);

  useEffect(() => {
    if (detail?.id !== undefined) {
      marketIndex$.next(detail.id);
    }
  }, [detail]);

  const goBack = useCallback(() => {
    navigate(fixLink('/liquidity'));
  }, []);

  return (
    <div
      className={clsx('relative flex flex-col w-1200px max-w-screen mx-auto mt-40px sm:pl-36px')}
    >
      <div
        className={clsx(
          'absolute left-0 top-0 cursor-pointer',
          'flex justify-center items-center p-6px box-border border-1px border-solid border-#2C2D2D border-r-none'
        )}
        onClick={goBack}
      >
        <LeftArrowIcon color="white" width={24} height={24} />
      </div>
      <div className="flex flex-row w-full">
        <div className={clsx('flex flex-col', [tab !== 'ResidualLPPosition' ? 'w-3/4' : 'w-full'])}>
          <Header data={detail as ConfigSymbol} onChange={(t) => setTab(t)} />
          {tab === 'Detail' && <Detail contract={detail as ConfigSymbol} />}
          {tab === 'LiveLPPosition' && <LivePosition contract={detail} />}
          {tab === 'ResidualLPPosition' && <ResidualPosition contract={detail} />}
        </div>
        <div className={clsx([tab !== 'ResidualLPPosition' ? 'w-1/3' : 'hidden'])}>
          {tab === 'Detail' && detail && <PlaceOrder contract={detail} />}
          {tab === 'LiveLPPosition' && detail && <PositionPlaceOrder />}
        </div>
      </div>
    </div>
  );
}

function useData() {
  const lastTrade: any = useObservable(lastTrade$, {});
  const contracts = useObservable(contracts$, []);
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const {fixLink} = useFixLink();

  const detail = useMemo(() => {
    const symbol: any = search.get('symbol');
    if (contracts?.length <= 0) {
      return null;
    }
    const contract = contracts.find((c) => c.symbol === symbol);
    if (!contract) {
      navigate(fixLink('/liquidity'));
      return;
    }
    const last = lastTrade?.[contract.symbol] || {};
    return {...contract, ...(last || {})};
  }, [contracts, search, lastTrade]);

  return {detail};
}
