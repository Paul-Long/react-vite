import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button} from '@rx/widgets';

export function EarnStrategies() {
  const {LG} = useLang();
  return (
    <div className="grid grid-cols-3 gap-24px mt-24px">
      <div className="flex flex-col gap-20px px-16px py-10px bg-gray-80 rounded-8px">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="font-size-14px lh-20px text-gray-600">{LG(lang.APR)}</span>
            <span className="font-size-32px lh-40px text-green-500 font-semibold">3.85%</span>
          </div>
          <Button type="primary">
            <i className="iconfont font-size-18px">&#xe606;</i>
            {LG(lang.Mint)}
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="font-size-14px text-gray-600">pmSOL-2403</span>
          <div className="flex flex-row items-center justify-end gap-16px">
            <span className="text-gray-600">{LG(lang.MaturityDate)}</span>
            <span>3/28/2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
