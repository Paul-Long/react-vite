import {useStream} from '@rx/hooks/use-stream';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {useCallback, useEffect} from 'react';
import {Filters} from './Filters';
import {Overview} from './Overview';
import {Details} from './details';
import {detail$} from './streams';

export default function () {
  const [detail, setDetail] = useStream(detail$);
  const handleSelect = useCallback((r: any) => {
    setDetail(r);
  }, []);
  useEffect(() => {
    queryLastTrade$.next(0);
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
  }, []);

  const renderDetail = useCallback(() => {
    if (!detail) {
      return null;
    }
    return <Details />;
  }, [detail]);

  return (
    <>
      {!detail && (
        <div className="flex flex-col w-1200px mx-auto">
          <Filters />
          <Overview onSelect={handleSelect} />
        </div>
      )}
      {renderDetail()}
    </>
  );
}
