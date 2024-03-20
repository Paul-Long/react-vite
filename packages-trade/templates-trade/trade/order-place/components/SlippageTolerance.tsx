import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import cn from 'classnames';
import React from 'react';

interface Props {
  value: string | number;
  mode: string;
  direction: string;
}

export function SlippageTolerance(props: Props) {
  const {value, mode, direction} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5">{LG(lang.SlippageTolerance)}</div>
        <span className={cn("font-size-22px", {
          buy: direction === 'Long',
          sell: direction === 'Short',
        })}>
          {value} <span className="font-size-14px T2">{mode === 'YT' ? '%' : 'bps'}</span>
        </span>
      </div>
    </StyledInputWrap>
  );
}
