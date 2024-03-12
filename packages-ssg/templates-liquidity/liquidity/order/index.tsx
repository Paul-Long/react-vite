import {BarChart} from '@/liquidity/charts/BarChart';
import {PieChart} from '@/liquidity/charts/PieChart';
import {SelectBps} from '@/liquidity/order/SelectBps';
import {useForm} from '@/liquidity/order/state';
import {select$} from '@/liquidity/stream/streams';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button} from '@rx/widgets';
import React from 'react';
import {StyledInputWrap, StyledItemWrap} from './styles';

export function Order() {
  const {LG} = useLang();
  const [select] = useStream(select$);
  const {handleSubmit} = useForm();

  return (
    <div className="df fdc p24px">
      {select?.includes('RLP') && <PieChart />}
      {select && !select?.includes('RLP') && <BarChart />}

      <div className="df fdc w100% gap8px mt24px">
        {select && !select?.includes('RLP') && <SelectBps />}
        {select && !select?.includes('RLP') && (
          <div className="df fdr jcsb gap16px">
            <StyledInputWrap className="df fdc jcc tc gap8px fw700 flex-1">
              <span className="font-size-14px T5">{LG(lang.LowerRange)}</span>
              <span className="font-size-22px T3">4.50%</span>
            </StyledInputWrap>
            <StyledInputWrap className="df fdc jcc tc gap8px fw700 flex-1">
              <span className="font-size-14px T5">{LG(lang.UpperRange)}</span>
              <span className="font-size-22px T3">4.65%</span>
            </StyledInputWrap>
          </div>
        )}

        <StyledItemWrap className="df fdc jcc tc gap8px fw700">
          <div className="df fdr jcsb aic font-size-14px T5">
            <span>{LG(lang.AddLiquidity)}</span>
            <span>{LG(clang.Balance)} : 10.0</span>
          </div>
          <div className="df fdr jcsb aic">
            <span className="font-size-22px T6">100</span>
            <span className="font-size-14px">
              SOL <i className="iconfont T3">&#xe624;</i>
            </span>
          </div>
        </StyledItemWrap>
      </div>

      <div className="df fdc T5 font-size-14px mt16px gap12px">
        <div className="df fdr aic jcsb">
          <span>{LG(lang.EstimatedAPR)}</span>
          <span>8.8%</span>
        </div>
        <div className="df fdr aic jcsb">
          <span>{LG(lang.EstimatedGas)}</span>
          <span>10.0%</span>
        </div>
      </div>
      <Button className="mt16px" type="default" onClick={handleSubmit}>
        {LG(lang.AddLiquidity)}
      </Button>
    </div>
  );
}
