import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {clsx} from 'clsx';
import {ReactNode} from 'react';

export function AssetsInfo({info, marginType}: any) {
  const {LG} = useLang();
  return (
    <div className="flex flex-col gap-8px">
      <InfoRow text={LG(lang.EstimatedEntryYield)} value={info.priceImpact ?? '-'} />
      <InfoRow text={LG(lang.PriceImpact)} value={info.impact} color="text-yellow-500" />
      {marginType === 'ISOLATED' && (
        <InfoRow text={LG(lang.LiquidationPrice)} value={info?.lipPrice ?? '-'} />
      )}
      <InfoRow text={LG(lang.TradingFee)} value={info?.fee ?? '-'} />
    </div>
  );
}

interface InfoRowProps {
  loading?: boolean;
  color?: string;
  text: ReactNode;
  value: string | number;
}

function InfoRow(props: InfoRowProps) {
  const {text, value, color = 'text-#E6E8EC'} = props;
  return (
    <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
      <div className="text-gray-600">{text}</div>
      <div className={clsx('font-medium flex flex-row items-center relative', color)}>{value}</div>
    </div>
  );
}
