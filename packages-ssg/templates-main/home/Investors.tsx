import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home.lang';

export function Investors() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col items-center mt-80px sm:mt-200px">
      <div className="font-size-24px sm:font-size-48px text-wrap text-center sm:w-584px">
        {LG(lang.OurInvestors)}
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap sm:overflow-hidden items-center sm:w-1200px max-w-100% gap-32px sm:gap-20px sm:not-last:ml-40px mt-64px sm:mt-80px hide-scrollbar">
        {items.map((s) => (
          <div
            key={s}
            className="flex justify-center items-center min-w-282px rounded-8px h-120px bg-green-400"
          >
            <img src={s} alt="" width={282} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const items = [
  '//static.rate-x.io/img/v1/080f64/ggvcapital.svg',
  '//static.rate-x.io/img/v1/140cb9/kucoin.svg',
  '//static.rate-x.io/img/v1/c00a43/snz.svg',
  '//static.rate-x.io/img/v1/a61654/animoca.svg',
  '//static.rate-x.io/img/v1/580fa2/presto-labs.svg',
  // '//static.rate-x.io/img/v1/fd75cd/gsr.png',
  // '//static.rate-x.io/img/v1/7762f2/lead-block.png',
];
