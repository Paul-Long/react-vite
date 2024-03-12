import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import React from 'react';

interface Props {
  value: string | number;
  mode: string;
}

export function SlippageTolerance(props: Props) {
  const {value, mode} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5">{LG(lang.SlippageTolerance)}</div>
        <span className="T6 font-size-22px">
          {value} <span className="font-size-14px T2">{mode === 'YT' ? '%' : 'bps'}</span>
        </span>
      </div>
    </StyledInputWrap>
  );
}
