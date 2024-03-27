import {orderPlaceVisible$} from '@/streams/streams-h5';
import {H5PageView} from '@/views-h5/H5PageView';
import {env} from '@rx/env';
import {useStream} from '@rx/hooks/use-stream';
import {Page} from '@trade/components/page';
import {TradePageView} from './layout/TradePageView';

export function PageView() {
  const [showOrderPlace] = useStream(orderPlaceVisible$);
  return (
    <Page scrollVisible={env.isMobile ? !showOrderPlace : true}>
      {env.isMobile ? <H5PageView /> : <TradePageView />}
    </Page>
  );
}
