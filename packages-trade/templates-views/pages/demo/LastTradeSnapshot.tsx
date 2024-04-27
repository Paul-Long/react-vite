import {useObservable} from '@rx/hooks/use-observable';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {StyledWrap} from './styles';

export function LastTradeSnapshot() {
  const lastTrade = useObservable<Record<string, any>>(lastTrade$, {});
  return (
    <StyledWrap className="df fdc gap24px">
      <h2>Last Trade Snapshot</h2>
      {Object.keys(lastTrade).map((key) => {
        const data = lastTrade[key];
        return (
          <div key={key} className="df fdc gap12px">
            <h3>{key}</h3>
            <div className="dg gap12px flex-wrap" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
              {Object.keys(data)
                .filter((k) => typeof data[k] === 'string')
                .map((k) => (
                  <div key={k} className="df fdr aic gap12px">
                    <div className="df fdr aic text-nowrap gap10px">
                      <span className="f16 fwbold">{k} : </span>
                      <span>{data[k]}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </StyledWrap>
  );
}
