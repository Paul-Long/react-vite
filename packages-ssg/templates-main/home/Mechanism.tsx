import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';

export function Mechanism() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col w-full items-center sm:100px mt-80px sm:mt-200px">
      <div className="font-size-24px text-center sm:font-size-48px text-wrap sm:w-584px">
        {LG(lang.OurMechanism)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 w-100% gap-24px sm:w-1200px max-w-100% mt-64px sm:mt-80px">
        {items(LG).map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-32px sm:gap-40px sm:pt-50px sm:pb-90px px-20px"
          >
            <img
              className="w-100px sm:w-200px h-100px sm:h-200px"
              src={item.img}
              alt={item.title}
            />
            <div className="flex- flex-col items-center gap-16px font-light">
              <div className="text-center font-size-24px">{item.title}</div>
              <div className="text-center font-size-12px text-gray-600 sm:font-size-16px">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const items = (LG: any) => [
  {title: LG(lang.TimeDecayAMM), desc: LG(lang.TimeDecayAMMDesc), img: HOME_IMAGES.TIME_DECAY_AMM},
  {
    title: LG(lang.ReserveVault),
    desc: LG(lang.ReserveVaultDesc),
    img: HOME_IMAGES.MULTI_LAYER_POOLS,
  },
  {
    title: LG(lang.MultiLayeredLiquidityPools),
    desc: LG(lang.MultiLayeredLiquidityPoolsDesc),
    img: HOME_IMAGES.MULTI_LAYERED_LIQUIDITY_POOLS,
  },
];
