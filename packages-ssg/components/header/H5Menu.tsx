import {FollowUs} from '@/components/FollowUs';
import {useMenus} from '@/header/state';
import {StyledH5Content} from '@/header/styles';
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
        <div className="flex flex-col items-center gap-48px">
          {menus.map((m) =>
            !m.children ? (
              <div
                key={m.key}
                className="block rounded-lg text-center text-base font-medium leading-7 text-white font-size-24px"
              >
                {m.title}
              </div>
            ) : (
              <div key={m.key} className="flex flex-col gap24px">
                <div
                  className="flex w-full items-center justify-center rounded-lg font-medium text-white gap-10px font-size-24px"
                  onClick={() => setSelect(select === m.key ? '' : m.key)}
                >
                  {m.title}
                  <i
                    className={clsx(
                      'iconfont font-size-14px transition-transform transform-rotate-[-90deg]',
                      [select !== 'Products' && 'transform-rotate-90deg']
                    )}
                  >
                    &#xe63c;
                  </i>
                </div>
                {select === m.key && (
                  <div className="flex flex-col justify-center gap-24px">
                    {m.children.map((cm) => (
                      <div
                        key={cm.key}
                        className="block rounded-lg text-center font-light text-gray-500 font-size-18px"
                      >
                        {cm.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <FollowUs align="center" />
      </div>
    </StyledH5Content>
  );
}
