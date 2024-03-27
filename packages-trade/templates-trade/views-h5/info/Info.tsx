import {useContractInfo} from '@/hooks/use-contract-info';
import {StyledInfoWrap} from './styles';

export function Info() {
  const {info} = useContractInfo();
  return (
    <div className="df fdc gap8px w100%">
      <StyledInfoWrap $count={4} className="p12px">
        {['TTM', 'Yield', 'Price', 'Cumulative Price'].map((k) => (
          <div key={k} className="df fdc aic jcc gap6px">
            <span className="font-size-12px line-height-14px T7 fw700 text-nowrap">{k}</span>
            <span className="font-size-16px T3 fw700 text-nowrap">{info?.[k] ?? '-'}</span>
          </div>
        ))}
      </StyledInfoWrap>
      <StyledInfoWrap $count={2} className="p12px">
        {['OpenInterest', 'Ava. Liquidity'].map((k) => (
          <div key={k} className="df fdc aic jcc gap6px">
            <span className="font-size-12px line-height-14px T7 fw700 text-nowrap">{k}</span>
            <span className="font-size-16px T3 fw700 text-nowrap">{info?.[k] ?? '-'}</span>
          </div>
        ))}
      </StyledInfoWrap>
    </div>
  );
}
