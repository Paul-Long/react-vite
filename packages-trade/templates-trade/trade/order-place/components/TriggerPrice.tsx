import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import React, {useCallback} from 'react';
import cn from 'classnames';

interface Props {
  value: string | number;
  mode: string;
  orderType: string;
  current: string;
  direction: string;
}

export function TriggerPrice(props: Props) {
  const {value, mode, orderType, current, direction} = props;
  const {LG} = useLang();
  const genLabel = useCallback(() => {
    if (orderType === 'StopMarket') {
      return mode == 'YT' ? LG(lang.TriggerYTPrice) : LG(lang.TriggerPrice);
    }
    if (orderType === 'StopLimit') {
      return mode == 'YT' ? LG(lang.TriggerPrice) : LG(lang.TriggerYield);
    }
  }, [mode, orderType]);
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5">{genLabel()}</div>
        <div className="T7">
          {LG(clang.Current)} : {current}
        </div>
      </div>

      <div className="df fdr jcsb">
        <span className={cn("font-size-22px", {
          buy: direction === 'Long',
          sell: direction === 'Short',
        })}>{value}</span>
        <span className="T3 font-size-14px">SOL</span>
      </div>
    </StyledInputWrap>
  );
}
