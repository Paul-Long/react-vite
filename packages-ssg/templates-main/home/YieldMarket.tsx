import {useMouseMask} from '@/home/hooks/use-mouse-mask';
import {HOME_IMAGES} from '@rx/const/images';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {MarqueeDivs} from './Marquee';

export function YieldMarket() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col w-full items-center sm:100px mt-80px sm:mt-200px">
      <div className="font-size-24px sm:font-size-48px text-wrap w-100% sm:w-1200px max-w-100% px-24px sm:px-0">
        {LG(lang.YieldMarket)}
      </div>
      <div className="flex flex-row justify-start sm:justify-center w-full max-w-full  overflow-x-auto">
        <MarqueeDivs>
          {assets(LG).map((a, i) => (
            <div
              key={a.contract}
              className="flex flex-row flex-nowrap sm:px-0 w-100% gap-24px sm:w-full overflow-y-visible overflow-x-auto mt-32px sm:mt-66px sm:pt-14px  hide-scrollbar"
            >
              <AssetItem asset={a} />
            </div>
          ))}
        </MarqueeDivs>
      </div>
    </div>
  );
}

function AssetItem({asset}: any) {
  const {LG} = useLang();
  const {handleMouseMove, maskImage} = useMouseMask();
  return (
    <div
      key={asset.contract}
      className="min-w-294px sm:min-w-384px sm:w-384px relative group dark card flex flex-col-reverse sm:flex-row rounded-8px gap-24px p-32px pb-48px sm:px-32px sm:py-56px bg-green-400 cursor-pointer hover:mt-[-14px] hover:mb-14px transition-all duration-300"
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-row items-start gap-20px">
          <div className="flex flex-row items-center min-h-48px sm:min-h-64px">
            {asset.img.map((img: string, i: number) => (
              <img
                key={img}
                className={clsx('w-32px h-32px block sm:w-64px sm:h-64px group-hover:sm:block', [
                  i > 0 && 'ml-[-16px]',
                ])}
                src={img}
                alt=""
              />
            ))}
          </div>
          <div className="flex flex-col h-full justify-center flex-nowrap">
            {asset.asset && (
              <div className="font-size-16px sm:font-size-24px sm:lh-32px">{asset.asset}</div>
            )}
            <div className="font-size-16px sm:font-size-24px sm:lh-32px overflow-hidden whitespace-nowrap text-ellipsis">
              {asset.contract}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start flex-nowrap mt-44px sm:mt-82px font-size-24px sm:font-size-48px gap-8px">
          <span className="text-green-500 font-light">{asset.impliedYield}</span>
          <div className="flex flex-col font-size-14px sm:font-size-18px text-gray-600 text-nowrap fw-light">
            <span>{LG(lang.ImpliedYield)}</span>
            <span>
              {LG(lang.ExpireIn)} {asset.term}
            </span>
          </div>
        </div>
        <div className="flex opacity-100 sm:opacity-0 group-hover:sm:opacity-100 transition-opacity duration-500 justify-start items-center">
          <img className="w-32px h-32px sm:w-48px sm:h-48px" src={HOME_IMAGES.GO_ARROW} alt="" />
        </div>
      </div>
      <div className="pointer-events-none">
        <div
          className="absolute inset-0 rounded-8px bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-15 dark:from-[#14F195] dark:to-[#14F195]"
          style={{maskImage}}
        />
      </div>
    </div>
  );
}

const assets = (LG: any) => [
  {
    asset: '',
    contract: 'SOL Staking',
    impliedYield: '--%',
    term: calcExpireIn(),
    img: ['//static.rate-x.io/img/v1/c9ec99/sol-2.svg'],
  },
  {
    asset: '',
    contract: 'JitoSOL',
    impliedYield: '--%',
    term: calcExpireIn(),
    img: ['//static.rate-x.io/img/v1/e1350d/jito-sol.svg'],
  },
  {
    asset: '',
    contract: 'JLP',
    impliedYield: '--%',
    term: calcExpireIn(),
    img: ['//static.rate-x.io/img/v1/4f95e0/SOL-JLP.svg'],
  },
  {
    asset: 'USDT',
    contract: 'USDC',
    impliedYield: '--%',
    term: calcExpireIn(),
    img: [
      '//static.rate-x.io/img/v1/9bfd67/USDT.svg',
      '//static.rate-x.io/img/v1/dbeb23/SOL-USDC.svg',
    ],
  },
];

function calcExpireIn() {
  const due = new Date('2024-12-28');
  const time = new Date().getTime();

  const maturity = Date.UTC(
    due.getFullYear(),
    due.getMonth(),
    due.getDate(),
    due.getHours(),
    due.getMinutes(),
    due.getSeconds()
  );

  const days = Big(maturity)
    .minus(time)
    .div(60 * 60 * 24 * 1000);
  if (days.gt(Big(365))) {
    return `${numUtil.trimEnd0(days.div(365).toFixed(0))} years`;
  }
  return `${numUtil.trimEnd0(days.toFixed(0))} days`;
}
