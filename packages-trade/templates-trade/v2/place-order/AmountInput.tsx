import {InputNumber} from '@/v2/place-order/InputNumber';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';

export function AmountInput() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row items-center justify-between text-gray-400">
        {LG(lang.NotionalAmount)}
      </div>
      <div className="flex flex-row items-center justify-between">
        <InputNumber />
        <div className="text-gray-400">mSOL-2406</div>
      </div>
    </div>
  );
}
