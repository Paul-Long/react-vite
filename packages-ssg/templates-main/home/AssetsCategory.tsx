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
        {item.bg && (
          <div className="inline-flex items-center justify-center group-hover:hidden">
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
        )}
        {item.hover && (
          <div className="items-center justify-center hidden group-hover:inline-flex">
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
        )}
      </div>
      <div className="font-size-12px sm:font-size-18px font-light">{item.title}</div>
    </div>
  );
}

const items = [
  {
    title: 'Liquid Staking',
    bg: ['//static.rate-x.io/img/v1/f5fba3/liquid-staking.svg'],
    hover: ['//static.rate-x.io/img/v1/6f1b47/liquid-staking-hover.svg'],
  },
  {
    title: 'LP Token',
    bg: ['//static.rate-x.io/img/v1/14945d/SOL-JLP-hover.svg'],
    hover: ['//static.rate-x.io/img/v1/4f95e0/SOL-JLP.svg'],
  },
  {
    title: 'Stables',
    bg: ['//static.rate-x.io/img/v1/2a45c5/stables.svg'],
    hover: ['//static.rate-x.io/img/v1/dbeb23/stables-hover.svg'],
  },
  {
    title: 'Cross-Chain Asset',
    bg: ['//static.rate-x.io/img/v1/583310/BTC.svg', '//static.rate-x.io/img/v1/370d8f/ETH.svg'],
    hover: [
      '//static.rate-x.io/img/v1/dbfe4a/btc-hover.svg',
      '//static.rate-x.io/img/v1/56fa54/eth-hover.svg',
    ],
  },
  {
    title: 'DePin',
    bg: ['//static.rate-x.io/img/v1/32d413/depin.svg'],
    hover: ['//static.rate-x.io/img/v1/755ee2/depin-hover.svg'],
  },
];
