import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import React from 'react';

interface Props {
  info: Record<string, any>;
}

export function Info(props: Props) {
  const {info} = props;
  const {LG} = useLang();
  return (
    <div className="df fdc T7" style={{gap: 12}}>
      <div className="df fdr jcsb aic">
        <div>
          {info.mode === 'YT' ? LG(lang.EstimatedEntryYield) : LG(lang.EstimatedEntryYield)}
        </div>
        <div>{info?.estimatedTrade}</div>
      </div>

      {info.orderType === 'Market' && (
        <div className="df fdr jcsb aic">
          <div>{info.mode === 'YT' ? LG(lang.PriceImpact) : LG(lang.YieldImpact)}</div>
          <div>{info?.impact}</div>
        </div>
      )}

      {info.orderType !== 'StopLimit' && (
        <div className="df fdr jcsb aic">
          <div>{info.mode === 'YT' ? LG(lang.LiquidationPrice) : LG(lang.LiquidationYield)}</div>
          <div>{info?.liquidation}</div>
        </div>
      )}

      <div className="df fdr jcsb aic">
        <div>{info.mode === 'YT' ? LG(lang.TradingFee) : LG(lang.EstimatedTradingFee)}</div>
        <div>{info?.estimatedTradingFee}</div>
      </div>

      <div className="df fdr jcsb aic">
        <div>{LG(lang.EstimatedGasExecution)}</div>
        <div>{info?.executionFee}</div>
      </div>
    </div>
  );
}
