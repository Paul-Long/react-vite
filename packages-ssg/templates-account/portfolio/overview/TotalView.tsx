import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import React from 'react';
import {StyledTotalView, StyledTotalViewItem} from '../components/styles';

export function TotalView() {
  const {LG} = useLang();
  return (
    <StyledTotalView className="df fdc p12px gap12px min-w460px fw700">
      <StyledTotalViewItem className="p12px border-rd-6px">
        <div className="df fdc pb16px gap22px" style={{borderBottom: '1px solid #333333'}}>
          <span className="font-size-14px T5">{LG(lang.TotalBalance)}</span>
          <div className="df fdr aic jcsb">
            <span className="font-size-22px T3">100</span>
            <span className="font-size-14px">SOL</span>
          </div>
        </div>

        <div className="df fdc mt16px gap22px pb22px">
          <span className="T5">{LG(lang.TodayPNL)}</span>
          <div className="df fdr aic jcsb">
            <span className="font-size-22px T3">100</span>
            <span className="font-size-14px">SOL</span>
          </div>
        </div>
      </StyledTotalViewItem>
      <StyledTotalViewItem className="df fdc gap22px p12px border-rd-6px">
        <span className="font-size-14px">{LG(lang.YieldSwapPNL)}</span>
        <div className="df fdr aife gap12px">
          <span className="T6">{100}</span>
          <span>SOL</span>
        </div>
      </StyledTotalViewItem>
      <StyledTotalViewItem className="df fdc gap22px p12px border-rd-6px">
        <span className="font-size-14px">{LG(lang.StrategyMarketValue)}</span>
        <div className="df fdr aife gap12px">
          <span className="T6">{100}</span>
          <span>SOL</span>
        </div>
      </StyledTotalViewItem>
    </StyledTotalView>
  );
}
