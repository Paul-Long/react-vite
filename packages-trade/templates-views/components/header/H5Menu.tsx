import {useMenus} from '@/components/header/state';
import {StyledH5Content} from '@/components/header/styles';
import {HOME_IMAGES} from '@rx/const/images';
import {clsx} from 'clsx';

interface Props {
  show: boolean;
  onChange: (show: boolean) => void;
}

export function H5Menu(props: Props) {
  const {show} = props;
  const {select, setSelect, menus} = useMenus({defaultMenu: 'Products'});
  return (
    <StyledH5Content
      className={clsx(
        'sm:hidden  fixed inset-y-0 right-0 z-9999 hidden flex-col w-full overflow-hidden',
        [show && 'flex']
      )}
    >
      <div className="flex justify-between items-center px-24px py-20px">
        <img className="h-24px w-auto" src={HOME_IMAGES.LOGO} alt="" />
        <button
          type="button"
          className="w-32px h-32px inline-flex justify-center items-center"
          onClick={() => props?.onChange(false)}
        >
          <i className="iconfont font-size-22px text-white">&#xe637;</i>
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-between my-60px">
        <div className="flex flex-col items-center gap-48px"></div>
      </div>
    </StyledH5Content>
  );
}
