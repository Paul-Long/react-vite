import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';

export function Investors() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col items-center mt-80px sm:mt-200px">
      <div className="font-size-24px sm:font-size-48px text-wrap text-center sm:w-584px">
        {LG(lang.OurInvestors)}
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap sm:overflow-hidden items-center max-w-100% gap-32px sm:gap-120px mt-64px sm:mt-80px hide-scrollbar">
        {items.map((s) => (
          <div
            key={s}
            className="flex justify-center items-center min-w-300px rounded-8px h-120px bg-green-400"
          >
            <img src={s} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const items = [
  '//static.rate-x.io/img/v1/11855e/pan-era.svg',
  '//static.rate-x.io/img/v1/2ab796/polychain_capital.svg',
  '//static.rate-x.io/img/v1/ae5609/dragonfly.svg',
  '//static.rate-x.io/img/v1/c83862/standard-crypto.svg',
  '//static.rate-x.io/img/v1/a73782/framework.svg',
];
