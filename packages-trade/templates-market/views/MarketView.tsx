import {detail$} from '@/streams';
import {Filters} from '@/views/Filters';
import {Overview} from '@/views/Overview';
import {Details} from '@/views/details';
import {useStream} from '@rx/hooks/use-stream';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {queryLastTrade$} from '@rx/streams/trade/last-trade';
import {Page} from '@trade/components/page';
import {Content} from '@trade/components/page/Content';
import {useCallback, useEffect} from 'react';

export function MarketView() {
  const [detail, setDetail] = useStream(detail$);
  const handleSelect = useCallback((r: any) => {
    setDetail(r);
  }, []);
  useEffect(() => {
    queryLastTrade$.next(0);
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
  }, []);
  return (
    <Page>
      <Content>
        {!detail && (
          <div className="flex flex-col w-1200px mx-auto">
            <Filters />
            <Overview onSelect={handleSelect} />
          </div>
        )}
        {!!detail && <Details />}
      </Content>
    </Page>
  );
}
