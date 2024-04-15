import {StyledAssetsCategoryItem} from '@/home/styles';
import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';

export function AssetsCategory() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col w-full items-center gap-32px sm:100px mt-80px sm:mt-200px">
      <div className="w-184px sm:max-w-396px sm:w-396px text-center font-size-24px sm:font-size-48px text-wrap">
        Our Target Asset Category
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-8px gap-y-24px w-100% sm:w-1200px">
        {items.map((item) => (
          <StyledAssetsCategoryItem
            $baseBg={item.bg}
            $hoverBg={item.hover}
            key={item.title}
            className="flex-none flex flex-col items-center gap-18px sm:flex-1 sm:gap-40px"
          >
            <div className="icon w-110px h-110px sm:w-120px sm:h-120px"></div>
            <div className="font-size-12px sm:font-size-18px font-light">{item.title}</div>
          </StyledAssetsCategoryItem>
        ))}
      </div>
    </div>
  );
}

const items = [
  {title: 'Liquid Staking', bg: HOME_IMAGES.SOLANA, hover: HOME_IMAGES.SOLANA_LIGHT},
  {title: 'Bitcoin Layer2', bg: HOME_IMAGES.BTC, hover: HOME_IMAGES.BTC_LIGHT},
  {title: 'RWAs', bg: HOME_IMAGES.RWAS, hover: HOME_IMAGES.RWAS_LIGHT},
  {title: 'NFT Rewards', bg: HOME_IMAGES.NFT, hover: HOME_IMAGES.NFT_LIGHT},
  {
    title: 'ReStaking Tokens',
    bg: HOME_IMAGES.RESTAKING_TOKEN,
    hover: HOME_IMAGES.RESTAKING_TOKEN_LIGHT,
  },
];
