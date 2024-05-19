import {StyledBanner, StyledLaunchApp} from '@/home/styles';
import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home.lang';

export function Banner() {
  const {LG} = useLang();
  return (
    <StyledBanner className="flex flex-col items-center mt-58px sm:mt-90px">
      <div className="content flex flex-col-reverse px-24px sm:px-0 sm:flex-row">
        <div className="flex flex-col justify-center gap48px">
          <div className="font-light text-wrap max-w100% font-size-32px text-center sm:max-w656px  sm:text-left sm:font-size-60px">
            {LG(lang.Banner)}
          </div>
          {/*<div className="flex flex-row items-center font-light justify-between gap-10px sm:gap-48px max-w100% sm:inline-flex sm:justify-start">*/}
          {/*  <div className="flex-1 df fdc gap8px text-center sm:text-left sm:flex-none">*/}
          {/*    <AnimateNumber value={4039036} />*/}
          {/*    <span className="font-size-12px text-gray-600">{LG(lang.TotalValueLocked)}</span>*/}
          {/*  </div>*/}
          {/*  <div className="w-1px h-40px sm:h-58px border-l-1px border-style-solid border-gray-400" />*/}
          {/*  <div className="flex flex-col flex-1 gap8px text-center sm:text-left sm:flex-none">*/}
          {/*    <AnimateNumber value={4039036} />*/}
          {/*    <span className="font-size-12px text-gray-600">{LG(lang.TotalTradingVolume)}</span>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="flex justify-center  sm:justify-start">
            <StyledLaunchApp className="inline-flex flex-row text-nowrap items-center justify-center font-semibold br8 w-300px font-size-24px line-height-28px cursor-pointer hover:opacity-80 active:opacity-80 sm:w-300px">
              {/*{LG(lang.Upcoming)} {LG(lang.LaunchApp)}*/}
              Upcoming Launch
            </StyledLaunchApp>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img className="sm:w546px w238px" src={HOME_IMAGES.HEADER_ICON} alt="" />
        </div>
      </div>
    </StyledBanner>
  );
}
