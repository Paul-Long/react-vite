import {OverviewChart} from '@/views/account/OverviewChart';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {clsx} from 'clsx';

export default function () {
  const {LG} = useLang();
  return (
    <div
      className={clsx(
        'flex flex-col w-1200px max-w-screen mx-auto',
        'border-x-1px border-x-solid border-#2C2D2D'
      )}
    >
      <div className="font-size-16px lh-24px py-12px px-20px fw-medium text-gray-500 border-b-1px border-solid border-#2C2D2D">
        {LG(lang.Overview)}
      </div>
      <OverviewChart />
    </div>
  );
}
