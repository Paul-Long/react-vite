import {ProgressBar} from '@/trade/components/ProgressBar';
import {StyledInputWrap} from '@/trade/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import cn from 'classnames';
import React from 'react';

interface Props {
  mode: string;
  direction: string;
  maxLeverage: number;
  value: any;
  onChange: (key: string, v: any) => void;
}

export function Leverage(props: Props) {
  const {maxLeverage, direction, value, onChange, mode} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5 f16">
          {mode === 'IRS' ? LG(tradeLang.MarginRatioSlider) : LG(tradeLang.LeverageSlider)}
        </div>
        <div className="font-size-12px T7">
          {mode === 'IRS' ? LG(tradeLang.MinimumMR) : LG(tradeLang.MaximumLeverage)}:{' '}
          {Math.round(maxLeverage)}
          {mode === 'IRS' ? '%' : 'x'}
        </div>
      </div>
      <div className="df fdr aife w100%">
        <div className={cn('font-size-22px T6')}>{value}</div>
        <span className="font-size-12px T7 mb4px">{mode === 'IRS' ? '%' : 'x'}</span>
      </div>
      <div className="pb20px">
        <ProgressBar
          value={value}
          max={maxLeverage}
          onChange={(v: any) => onChange('leverage', v)}
          color={'#27F2A9'}
          util={mode === 'IRS' ? '%' : 'x'}
        />
      </div>
    </StyledInputWrap>
  );
}
