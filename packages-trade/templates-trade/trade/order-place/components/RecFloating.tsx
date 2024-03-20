import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import React from 'react';

interface Props {
  value: number | string;
  direction: string;
}

export function RecFloating(props: Props) {
  const {value, direction} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc aic flex-1 gap8px">
      <span className="font-size-14px T7">{LG(lang.RecFloating)}</span>
      <span className="font-size-22px T3">{value}</span>
    </StyledInputWrap>
  );
}
