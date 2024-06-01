import {useObservable} from '@rx/hooks/use-observable';
import {current$} from '../streams/streams';
import {TradingView} from '../tv';
export function TradingViewChart() {
  const current = useObservable(current$, undefined);
  return (
    <div className="w-full min-h-448px h-448px">
      {!!current && <TradingView symbol={current.symbol}></TradingView>}
    </div>
  );
}
