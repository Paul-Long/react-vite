import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Select} from '@rx/widgets';
import cn from 'classnames';
import React, {useState} from 'react';

interface Props {
  value: string | number;
  mode: string;
  contract: string;
  direction: string;
}

export function DepositMargin(props: Props) {
  const {value, mode, contract, direction} = props;
  const {LG} = useLang();
  const [currency, setCurrency] = useState('SOL');
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5">{LG(lang.DepositMargin)}</div>
        <div className="T7">{LG(clang.Balance)} : 10</div>
      </div>

      <div className="df fdr jcsb">
        <span className={cn("font-size-22px", {
          buy: direction === 'Long',
          sell: direction === 'Short',
        })}>{value}</span>
        <Select className="min-w120px" align='right' options={[{label: 'SOL', value: 'SOL'}, {label: contract, value: contract}]} value={currency} onChange={(c) => setCurrency(c)} showBackground={false} />
      </div>
    </StyledInputWrap>
  );
}
