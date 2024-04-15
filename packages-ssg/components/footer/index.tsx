import {FollowUs} from '@/components/FollowUs';
import {StyledFooter} from '@/footer/styles';
import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';

export function Footer() {
  const {LG} = useLang();
  return (
    <StyledFooter className="flex flex-row justify-center mt-100px sm:mt-200px">
      <div className="content flex flex-col-reverse gap-100px sm:gap-0 px-24px sm:flex-row">
        <div className="flex flex-col flex-items-start gap-32px">
          <img className="h-32px sm:h-42px" src={HOME_IMAGES.LOGO} alt="RateX" />
          <div className="font-size-12px sm:font-size-16px text-gray-400">
            {LG(lang.FooterPowered)}
          </div>
        </div>
        <div className="flex-none flex flex-col gap-48px sm:gap-146px sm:flex-1 sm:justify-end sm:flex-row">
          <div className="flex flex-col justify-start">
            <div className="font-size-16px text-gray-400">{LG(lang.Audits)}</div>
            <img className="w-170px h-48px" src={HOME_IMAGES.CERTIK} alt="" />
          </div>
          <FollowUs align="left" />
        </div>
      </div>
    </StyledFooter>
  );
}
