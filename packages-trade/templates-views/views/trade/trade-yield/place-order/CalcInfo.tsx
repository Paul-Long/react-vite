import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {ReactNode} from 'react';

export function CalcInfo({info, marginType}: {info: Record<string, any>; marginType: string}) {
  const {LG} = useLang();
  return (
    <div className="flex flex-col gap-8px px-20px pt-12px pb-16px">
      <Item label={LG(lang.EstimatedEntryYield)}>{info.priceImpact ?? '-'}</Item>
      <Item label={LG(lang.PriceImpact)}>
        <span className="text-yellow-500">{info.impact}</span>
      </Item>
      {marginType === 'ISOLATED' && (
        <Item label={LG(lang.LiquidationPrice)}>{info?.lipPrice ?? '-'}</Item>
      )}
      <Item label={LG(lang.TradingFee)}>{info?.fee ?? '-'} SOL</Item>
    </div>
  );
}

function Item({label, children}: {label: ReactNode; children: ReactNode}) {
  return (
    <div className="flex flex-row items-center justify-between font-size-12px lh-18px">
      <span className="text-gray-60">{label}</span>
      <div className="fw-medium">{children}</div>
    </div>
  );
}
