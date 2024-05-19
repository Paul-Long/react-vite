import {ReferencePrice} from '@/pages/trade/place-order/ReferencePrice';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {useState} from 'react';

export function RateInput({
  fixedRate,
  direction,
}: {
  fixedRate: string;
  direction: 'LONG' | 'SHORT';
}) {
  const {LG} = useLang();
  const [rate, setRate] = useState<string>('');
  return (
    <div className="flex flex-row justify-between items-end p-16px gap-10px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex-1 flex flex-col gap-8px">
        <div className="font-size-14px text-gray-600">
          {direction === 'LONG' ? LG(lang.PayFixed) : LG(lang.PayFixed)}
        </div>
        <div className="text-yellow-500 font-size-24px lh-36px">{fixedRate ?? '-'}</div>
      </div>
      <div className="inline-flex justify-center items-center p-8px box-border bg-gray-80 rounded-4px cursor-default">
        <i className="iconfont font-size-24px lh-24px text-gray-600">&#xe605;</i>
      </div>
      <div className="flex-1 flex flex-col items-end gap-8px">
        <ReferencePrice onChange={(v: string) => setRate(v)} />
        <div className="text-yellow-500 font-size-24px lh-36px">{rate ?? '-'}</div>
      </div>
    </div>
  );
}
