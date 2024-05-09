import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {Big} from 'big.js';
import {ReactNode} from 'react';

export function AssetsInfo({info, marginType}: any) {
  const {LG} = useLang();
  return (
    <div className="flex flex-col gap-8px">
      <InfoRow text={LG(lang.EstimatedEntryYield)} value={info.py ?? '-'} />
      <InfoRow
        text={LG(lang.PriceImpact)}
        value={info.impliedSwapRate ? Big(info.impliedSwapRate).times(100).toFixed(2) + '%' : '-'}
      />

      {marginType === 'ISOLATED' && (
        <InfoRow text={LG(lang.LiquidationPrice)} value={info?.lipPrice ?? '-'} />
      )}
      <InfoRow text={LG(lang.TradingFee)} value={info?.fee ?? '-'} />
      <InfoRow text={LG(lang.EstimatedGasExecution)} value="-" />
    </div>
  );
}

interface InfoRowProps {
  text: ReactNode;
  value: string | number;
}

function InfoRow(props: InfoRowProps) {
  const {text, value} = props;
  return (
    <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
      <div className="text-gray-600">{text}</div>
      <div className="text-#E6E8EC font-medium">{value}</div>
    </div>
  );
}
