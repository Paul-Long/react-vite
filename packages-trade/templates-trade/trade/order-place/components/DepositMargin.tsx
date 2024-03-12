import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import React from 'react';

interface Props {
  value: string | number;
  mode: string;
}

export function DepositMargin(props: Props) {
  const {value, mode} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5">{LG(lang.DepositMargin)}</div>
        <div className="T7">{LG(clang.Balance)} : 10</div>
      </div>

      <div className="df fdr jcsb">
        <span className="T6 font-size-22px">{value}</span>
        <span className="T3 font-size-14px">SOL</span>
      </div>
    </StyledInputWrap>
  );
}
