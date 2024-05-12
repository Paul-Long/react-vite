import {Info} from '@/pages/lp/slp/Info';
import {Range} from '@/pages/lp/slp/Range';
import {WalletBalance} from '@/pages/lp/WalletBalance';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {Button} from '@rx/widgets';

export function PlaceOrder() {
  const {LG} = useLang();
  return (
    <div className="flex flex-row gap-24px">
      <div className="flex flex-col flex-1">
        <Info />
      </div>
      <div className="flex flex-col w-384px rounded-8px bg-gray-40 py-16px px-24px gap-20px">
        <div className="font-size-16px">{LG(lang.StandardRange)}</div>
        <Range />
        <div className="flex flex-col">
          <div className="w-full h-1px bg-gray-40 mb-8px" />
          <WalletBalance />
          <div className="w-full h-1px bg-gray-40 mt-16px" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-gray-600">{LG(lang.EstimatedAPR)}</span>
          <span className="bg-#fff1eb19 font-size-14px lh-16px text-#FFD166 py-2px px-8px rounded-20px">
            0.03%
          </span>
        </div>
        <Button type="trade">{LG(lang.AddLiquidity)}</Button>
      </div>
    </div>
  );
}
