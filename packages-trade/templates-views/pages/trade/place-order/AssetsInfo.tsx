import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';

export function AssetsInfo() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col gap-8px">
      <InfoRow text={LG(lang.EstimatedEntryYield)} value="0.022440" />
      <InfoRow text={LG(lang.PriceImpact)} value="0.02%" />
      <InfoRow text={LG(lang.LiquidationPrice)} value="0.018953" />
      <InfoRow text={LG(lang.TradingFee)} value="0.002244" />
      <InfoRow text={LG(lang.EstimatedGasExecution)} value="0.001122" />
    </div>
  );
}

interface InfoRowProps {
  text: JSX.Element;
  value: string | number;
}

function InfoRow(props: InfoRowProps) {
  const {text, value} = props;
  return (
    <div className="flex flex-row items-center justify-between font-size-12px lh-20px">
      <div className="text-gray-600">{text}</div>
      <div className="text-#E6E8EC font-medium">{value}</div>
    </div>
  );
}
