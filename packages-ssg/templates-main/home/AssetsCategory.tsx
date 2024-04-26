import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';
import {clsx} from 'clsx';

export function AssetsCategory() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col w-full items-center gap-32px sm:gap-100px sm:100px mt-80px sm:mt-200px">
      <div className="w-full text-center font-size-24px sm:font-size-48px text-wrap">
        {LG(lang.UnderlyingAsset)}
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-8px gap-y-24px w-100% sm:w-1200px max-w-100%">
        {items.map((item) => (
          <AssetsItems key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function AssetsItems({item}: any) {
  return (
    <div className="group flex-none flex flex-col items-center gap-18px sm:flex-1 sm:gap-40px">
      <div className="flex justify-center items-center w-110px h-110px sm:w-150px sm:h-150px rounded-8px bg-#B7FFE114">
        <div className="inline-flex group-hover:hidden items-center justify-center">
          {item.bg.map((b: string, i: number) => (
            <img
              className={clsx([i > 0 && 'ml-[-32px]'])}
              key={b}
              src={b}
              alt={item.title}
              width={64}
              height={64}
            />
          ))}
        </div>
        <div className="hidden group-hover:inline-flex items-center justify-center">
          {item.hover.map((b: string, i: number) => (
            <img
              className={clsx([i > 0 && 'ml-[-32px]'])}
              key={b}
              src={b}
              alt={item.title}
              width={64}
              height={64}
            />
          ))}
        </div>
      </div>
      <div className="font-size-12px sm:font-size-18px font-light">{item.title}</div>
    </div>
  );
}

const items = [
  {
    title: 'Liquid Staking',
    bg: ['//static.rate-x.io/img/v1/cef79f/liquid-staking.svg'],
    hover: ['//static.rate-x.io/img/v1/6f1b47/liquid-staking-hover.svg'],
  },
  {
    title: 'LP Token',
    bg: ['//static.rate-x.io/img/v1/b2d8ce/lp-token.svg'],
    hover: ['//static.rate-x.io/img/v1/3f3448/lp-token-hover.svg'],
  },
  {
    title: 'Stables',
    bg: ['//static.rate-x.io/img/v1/62bdc8/stables.svg'],
    hover: ['//static.rate-x.io/img/v1/dbeb23/stables-hover.svg'],
  },
  {
    title: 'Cross-Chain Asset',
    bg: ['//static.rate-x.io/img/v1/022b76/btc.svg', '//static.rate-x.io/img/v1/9649cd/eth.svg'],
    hover: [
      '//static.rate-x.io/img/v1/dbfe4a/btc-hover.svg',
      '//static.rate-x.io/img/v1/56fa54/eth-hover.svg',
    ],
  },
  {
    title: 'DePin',
    bg: ['//static.rate-x.io/img/v1/6fa7bc/depin.svg'],
    hover: ['//static.rate-x.io/img/v1/755ee2/depin-hover.svg'],
  },
];
