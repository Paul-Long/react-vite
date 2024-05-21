import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {clsx} from 'clsx';
import {useCallback} from 'react';

export function Header() {
  const {LG} = useLang();
  const handleClick = useCallback(
    (menu: any) => () => {
      if (menu.link) {
        if (menu.link.startsWith('https')) {
          window.open(menu.link, '_blank', 'noopener');
        }
      }
    },
    []
  );
  return (
    <div className="flex flex-row items-center justify-between w-full sm:max-w-1728px sm:min-w-1341px h-72px min-h-72px sm:h-100px sm:min-h-100px mx-auto px-20px">
      <div className="flex lg:flex-1">
        <img className="h-24px lg:h-32px w-auto" src={HOME_IMAGES.LOGO} alt="" />
      </div>
      <div className="hidden flex-1 sm:flex flex-row justify-end sm:mr-100px items-center gap-48px font-size-15px">
        {menus.map((m) => (
          <div
            className={clsx('cursor-pointer lh-40px', [
              m.title === 'Home' ? 'text-#F6F7F3' : 'text-#F6F7F34C hover:text-#F6F7F3',
            ])}
            onClick={handleClick(m)}
            key={m.title}
          >
            {m.title}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex flex-row items-center gap-60px">
        <div className="flex flex-row items-center gap-30px">
          {medias.map((m) => (
            <img
              className={clsx('cursor-pointer', [m.title === 'discord' && 'opacity-30 scale-140'])}
              key={m.title}
              src={m.img}
              alt={m.title}
              width={28}
              height={28}
              onClick={() => !!m.link && window.open(m.link, '_blank', 'noopener')}
            />
          ))}
        </div>
        <div
          className={clsx(
            'bg-#8DCC2F text-#09090A py-16px px-20px font-size-20px lh-20px rounded-2px cursor-pointer',
            'flex flex-row items-center gap-16px'
          )}
        >
          <img
            className="h-14px"
            src="https://static.rate-x.io/img/v1/3d02b0/points.png"
            alt="launch app"
          />
          Upcoming Launch
        </div>
      </div>
      <div className="flex sm:hidden">
        <div
          className={clsx(
            'bg-#8DCC2F text-#09090A py-10px px-12px font-size-16px lh-16px rounded-2px cursor-pointer',
            'flex flex-row items-center gap-16px'
          )}
        >
          Upcoming Launch
        </div>
      </div>
    </div>
  );
}

const medias = [
  {
    title: 'twitter',
    img: 'https://static.rate-x.io/img/v1/1e3b0b/twitter.png',
    link: 'https://twitter.com/RateX_Dex',
  },
  {
    title: 'telegram',
    img: 'https://static.rate-x.io/img/v1/dd0342/telegram.png',
    link: 'https://t.me/RateXofficial',
  },
  {
    title: 'discord',
    img: 'https://static.rate-x.io/img/v1/eed951/discord.svg',
    link: 'https://discord.com/invite/DuhAc4UP5x',
  },
  {title: 'github', img: 'https://static.rate-x.io/img/v1/eb0ced/github.png'},
];

const menus = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Trade',
  },
  {
    title: 'Earn',
  },
  {
    title: 'Protocol',
  },
  {
    title: 'Docs',
    link: 'https://docs.rate-x.io/ratex',
  },
];
