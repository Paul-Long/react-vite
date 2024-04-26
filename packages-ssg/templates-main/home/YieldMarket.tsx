import {useMouseMask} from '@/home/hooks/use-mouse-mask';
import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';

export function YieldMarket() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col w-full items-center sm:100px mt-80px sm:mt-200px">
      <div className="font-size-24px sm:font-size-48px text-wrap w-100% sm:w-1200px max-w-100% px-24px sm:px-0">
        {LG(lang.YieldMarket)}
      </div>
      <div className="flex flex-row justify-start sm:justify-center sm:w-1200px max-w-100%  overflow-x-auto">
        <div className="flex flex-row flex-nowrap px-24px sm: px-0 w-100% gap-24px sm:w-100% overflow-y-visible overflow-x-auto mt-32px sm:mt-66px sm:pt-14px  hide-scrollbar">
          {assets(LG).map((a, i) => (
            <AssetItem key={a.contract} asset={a} />
          ))}
        </div>
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
          <img
            className="w-32px h-32px block sm:w-64px sm:h-64px group-hover:sm:block "
            src={asset.img}
            alt=""
          />
          <div className="flex flex-col flex-nowrap gap-8px">
            <div className="font-size-18px sm:font-size-24px">{asset.asset}</div>
            <div className="font-size-18px sm:font-size-24px overflow-hidden whitespace-nowrap text-ellipsis">
              {asset.contract}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start flex-nowrap mt-44px sm:mt-116px font-size-24px sm:font-size-48px gap-8px">
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
    asset: 'SOL',
    contract: 'Native Staking',
    impliedYield: '30%',
    term: '25 Days',
    img: '//static.rate-x.io/img/v1/c9ec99/sol-2.svg',
  },
  {
    asset: 'SOL',
    contract: 'JitoSOL',
    impliedYield: '19%',
    term: '17 Days',
    img: '//static.rate-x.io/img/v1/6e8282/jitosol.svg',
  },
  {
    asset: 'SOL',
    contract: 'JLP',
    impliedYield: '28%',
    term: '17 Days',
    img: '//static.rate-x.io/img/v1/4f95e0/SOL-JLP.svg',
  },
  {
    asset: 'SOL',
    contract: 'USDC',
    impliedYield: '28%',
    term: '17 Days',
    img: '//static.rate-x.io/img/v1/dbeb23/SOL-USDC.svg',
  },
];
