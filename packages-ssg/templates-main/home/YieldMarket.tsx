import {useMouseMask} from '@/home/hooks/use-mouse-mask';
import {StyledYieldMarket} from '@/home/styles';
import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';
import {useState} from 'react';

export function YieldMarket() {
  const {LG} = useLang();
  const [hover, setHover] = useState<boolean>(false);
  return (
    <StyledYieldMarket className="flex flex-col w-full items-center sm:100px mt-80px sm:mt-200px">
      <div className="font-size-24px sm:font-size-48px text-wrap w-100% sm:w-1200px px-24px sm:px-0">
        {LG(lang.YieldMarket)}
      </div>
      <div className="flex flex-row justify-start sm:justify-center max-w-100%">
        <div className="flex flex-row flex-nowrap px-24px sm: px-0 w-100% gap-24px sm:w-100% overflow-x-auto overflow-y-hidden mt-32px sm:mt-80px  hide-scrollbar">
          <div
            className="my-grid min-w-924px sm:min-w-1584px sm:overflow-hidden flex flex-row flex-nowrap gap-24px"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {assets(LG).map((a, i) => (
              <AssetItem key={a.contract} asset={a} noHover={!hover && i === 0} index={i} />
            ))}
          </div>
        </div>
      </div>
    </StyledYieldMarket>
  );
}

// (i === 0 ? ' sm:min-w-792px' : ' sm:min-w-384px')
function AssetItem({asset, noHover, index}: any) {
  const {LG} = useLang();
  const {handleMouseMove, maskImage} = useMouseMask();
  return (
    <div
      key={asset.contract}
      className={` min-w-292px ${
        noHover ? 'sm:w-768px' : 'sm:w-384px'
      } sm:hover:w-768px relative group dark card flex flex-col-reverse sm:flex-row rounded-8px gap-24px p-32px pb-48px sm:px-32px sm:py-56px bg-green-400 cursor-pointer transition-width duration-500 h-310px sm:h-410px `}
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-row items-center flex-nowrap gap-8px">
          <div className="font-size-18px sm:font-size-40px">{asset.asset}</div>
          <div className="w-1px h-14px sm:h-32px bg-gray-400" />
          <div className="font-size-18px sm:font-size-40px overflow-hidden whitespace-nowrap text-ellipsis">
            {asset.contract}
          </div>
        </div>
        <div className="flex flex-row items-center flex-nowrap mt-44px sm:mt-116px font-size-24px sm:font-size-32px gap-8px">
          {LG(lang.ImpliedYield)}
          <span className="text-green-500 font-medium">{asset.impliedYield}</span>
        </div>
        <div className="font-size-14px sm:font-size-18px text-gray-500">
          {LG(lang.Term)} {asset.term}
        </div>
        <div className="flex opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 justify-start items-center">
          <img className="w-32px h-32px sm:w-48px sm:h-48px" src={HOME_IMAGES.GO_ARROW} alt="" />
        </div>
      </div>
      <img
        className={
          'w-32px h-32px block sm:w-100px sm:h-100px group-hover:sm:block ' +
          (noHover ? 'sm:block' : ' sm:hidden')
        }
        src={asset.img}
        alt=""
      />
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
    contract: 'mSOL',
    impliedYield: '28%',
    term: '17 Days',
    img: '//static.rate-x.io/img/v1/d4c192/msol.svg',
  },
  {
    asset: 'SOL',
    contract: 'JitoSOL',
    impliedYield: '19%',
    term: '17 Days',
    img: '//static.rate-x.io/img/v1/6e8282/jitosol.svg',
  },
];
