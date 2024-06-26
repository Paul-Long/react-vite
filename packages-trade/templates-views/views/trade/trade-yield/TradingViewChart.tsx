import {current$} from '@/streams/trade/page-state';
import {useObservable} from '@rx/hooks/use-observable';
import {TradingView} from './tv';

export function TradingViewChart() {
  const current = useObservable(current$, undefined);
  return (
    <div className="flex-1 min-h-464px h-464px">
      {!!current && <TradingView symbol={current.symbol}></TradingView>}
    </div>
  );
}
