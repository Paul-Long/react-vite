import {InputNumber} from '@/v2/place-order/InputNumber';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';

export function SlippageTolerance() {
  const {LG} = useLang();
  return (
    <div className="flex flex-row items-center p-16px gap-10px not-last:b-b-1px b-solid b-gray-40">
      <div className="font-size-14px lh-24px font-medium text-gray-600 text-nowrap">
        {LG(lang.SlippageTolerance)}
      </div>
      <InputNumber size="md" align="right" />
      <span className="font-size-14px lh-24px text-gray-400">%</span>
    </div>
  );
}
