import {StyledInputWrap} from '@/views/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import cn from 'classnames';

interface Props {
  mode: string;
  current: string | number;
  value: string | number;
  direction: string;
}

export function LimitPrice(props: Props) {
  const {value, current, mode, direction} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5 font-size-14px">
          {mode === 'YT' ? LG(lang.LimitPrice) : LG(lang.LimitYield)}
        </div>
        <div className="T7">
          {LG(clang.Current)} : {current}
        </div>
      </div>
      <span
        className={cn('font-size-22px', {
          buy: direction === 'Long',
          sell: direction === 'Short',
        })}
      >
        {value}
      </span>
    </StyledInputWrap>
  );
}
