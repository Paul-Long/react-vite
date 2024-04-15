import {useMouseMask} from '@/home/hooks/use-mouse-mask';
import {StyledYieldSwap} from '@/home/styles';
import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';

export function YieldSwap() {
  const {LG} = useLang();
  return (
    <StyledYieldSwap className="df fdc aic mt-80px sm:mt-240px">
      <div className="content grid gap-24px w-100% grid-cols-1 px-24px sm:w-1200px sm:px-0 sm:grid-cols-3">
        {genCards(LG).map((card) => (
          <CardItem card={card} key={card.title} />
        ))}
      </div>
    </StyledYieldSwap>
  );
}

function CardItem({card}: any) {
  const {maskImage, handleMouseMove} = useMouseMask();
  return (
    <div
      className="group dark flex flex-col items-center px-24px py48px sm:px-32px sm:py-64px bg-#b7ffe114 rounded-8px cursor-pointer relative hover:mt-[-14px] hover:mb-14px transition-all duration-300 "
      onMouseMove={handleMouseMove}
    >
      <img className="w-64px h-64px sm:w-120px sm:h-120px" src={card.img} alt={card.title} />
      <div className="flex flex-col items-center gap-8px sm:gap-18px mt-16px sm:mt-64px">
        <div className="font-size-24px sm:font-size-32px">{card.title}</div>
        <div className="text-center text-wrap font-size-16px text-gray-500 min-h-48px">
          {card.desc}
        </div>
        <div className="go-page hidden sm:opacity-0 group-hover:opacity-100 sm:flex justify-center items-center">
          <img className="w-48px h-48px" src={HOME_IMAGES.GO_ARROW} alt="" />
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

const genCards = (LG: any) => [
  {
    img: HOME_IMAGES.TRADE_YIELD,
    title: LG(lang.TradeYield),
    desc: LG(lang.TradeYieldDesc),
  },
  {
    img: HOME_IMAGES.CREATE_YIELD_ASSET,
    title: LG(lang.CreateYieldAsset),
    desc: LG(lang.CreateYieldAssetDesc),
  },
  {
    img: HOME_IMAGES.BUILD_STRATEGY_VAULT,
    title: LG(lang.BuildStrategyVault),
    desc: [LG(lang.BuildStrategyVaultDesc)],
  },
];
