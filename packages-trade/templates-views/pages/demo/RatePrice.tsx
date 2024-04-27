import {useObservable} from '@rx/hooks/use-observable';
import {ratePriceMap$} from '@rx/streams/market/rate-price';
import {StyledWrap} from './styles';

export function RatePrice() {
  const priceMap = useObservable<Record<string, any>>(ratePriceMap$, {});
  return (
    <StyledWrap className="df fdc gap24px">
      <h2>Rate Price</h2>
      {Object.keys(priceMap).map((k) => (
        <div key={k} className="df fdr aic gap12px">
          <span className="f16 fwbold">{k} : </span>
          <span>{priceMap[k]}</span>
        </div>
      ))}
    </StyledWrap>
  );
}
