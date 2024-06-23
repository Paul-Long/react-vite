import {AssetList} from '@/components/AssetList';
import {SpecificPool} from '@/views/trade/liquidity/SpecificPool';
import {queryRatePrice$} from '@rx/streams/market/rate-price';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {markPrice$} from '@rx/streams/subscription/mark-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';

export default function () {
  const [contract, setContract] = useState('ALL');

  useEffect(() => {
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
    queryLastTrade$.next(0);
    lastTradeSnapshot$.next('dc.md.trade.*');
    queryRatePrice$.next(0);
    markPrice$.next('dc.aps.markprice.*');
  }, []);

  return (
    <div
      className={clsx(
        'flex flex-col w-1200px max-w-screen mx-auto mt-40px',
        'border-1px border-solid border-#2C2D2D'
      )}
    >
      <div className="flex flex-col px-20px pt-20px pb-10px border-b-1px border-b-solid border-b-#2C2D2D">
        <AssetList onContract={(con: string) => setContract(con)} />
      </div>
      <SpecificPool contract={contract} />
    </div>
  );
}
