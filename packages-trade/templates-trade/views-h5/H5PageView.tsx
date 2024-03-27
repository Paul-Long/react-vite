import {orderPlaceVisible$} from '@/streams/streams-h5';
import {AssetsViews} from '@/views-h5/assets-views/AssetsViews';
import {ChartView} from '@/views-h5/chart-view/ChartView';
import {H5OrderView} from '@/views-h5/order-place/H5OrderView';
import {RecentTrades} from '@/views-h5/recent-trades/RecentTrades';
import {PositionsView} from '@/views/positions/PositionsView';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {Button} from '@rx/widgets';

export function H5PageView() {
  const {LG} = useLang();
  const [visible, setVisible] = useStream(orderPlaceVisible$);
  return (
    <div className="df fdc">
      <div className="df fdc gap12px">
        <AssetsViews />
        <ChartView />
        <RecentTrades />
        <div style={{marginLeft: -16, marginRight: -16}}>
          <PositionsView />
        </div>
        <Button
          type="warning"
          size={44}
          className="mt18px mb24px font-size-16px fw700"
          onClick={() => setVisible(true)}
        >
          {LG(lang.Trade).toUpperCase()}
        </Button>
      </div>
      {visible && <H5OrderView />}
    </div>
  );
}
