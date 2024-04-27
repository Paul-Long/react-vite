import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';

export function Overview() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col gap-16px mt-36px">
      <div className="font-size-16px">{LG(lang.Overview)}</div>
      <div className="flex flex-row gap-8px">
        <div className="flex-1 grid grid-cols-2 gap-8px">
          <div className="flex flex-col bg-gray-80 rounded-8px px-16px py-8px">
            <span className="text-gray-600">{LG(lang.TotalBalance)}</span>
            <div className="flex flex-row items-end gap-8px mt-24px">
              <span className="font-size-24px">103.84</span>
              <span className="font-size-24px">SOL</span>
            </div>
            <span className="font-size-12px text-gray-600 mt-8px">16,652.8208 $</span>
          </div>
          <div className="flex flex-col bg-gray-80 rounded-8px px-16px py-8px">
            <span className="text-gray-600">{LG(lang.TodayPNL)}</span>
            <div className="flex flex-row items-end gap-8px mt-24px">
              <span className="font-size-24px">0.16</span>
              <span className="font-size-24px">SOL</span>
            </div>
            <span className="font-size-12px text-gray-600 mt-8px">25.6592 $</span>
          </div>
          <div className="flex flex-col bg-gray-80 rounded-8px px-16px py-8px">
            <span className="text-gray-600">{LG(lang.YieldSwapPNL)}</span>
            <div className="flex flex-row items-end gap-8px mt-24px">
              <span className="font-size-24px text-green-500">3.85</span>
              <span className="font-size-24px">SOL</span>
            </div>
            <span className="font-size-12px text-gray-600 mt-8px">617.4245 $</span>
          </div>
          <div className="flex flex-col bg-gray-80 rounded-8px px-16px py-8px">
            <span className="text-gray-600">{LG(lang.StrategyMarketValue)}</span>
            <div className="flex flex-row items-end gap-8px mt-24px">
              <span className="font-size-24px text-green-500">9.45</span>
              <span className="font-size-24px">SOL</span>
            </div>
            <span className="font-size-12px text-gray-600 mt-8px">1,515.4965 $</span>
          </div>
        </div>
        <div className="flex-1 bg-gray-80 rounded-8px px-16px py-8px"></div>
      </div>
    </div>
  );
}
