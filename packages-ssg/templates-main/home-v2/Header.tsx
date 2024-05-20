import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home.lang';
import {clsx} from 'clsx';
import {useCallback} from 'react';

export function Header() {
  const {LG} = useLang();
  const handleClick = useCallback(
    (menu) => () => {
      if (menu.link) {
        if (menu.link.startsWith('https')) {
          window.open(menu.link, '_blank', 'noopener');
        }
      }
    },
    []
  );
  return (
    <div className="flex flex-row items-center justify-between w-full max-w-1728px h-100px mx-auto">
      <div className="flex lg:flex-1">
        <img className="h-24px lg:h-32px w-auto" src={HOME_IMAGES.LOGO} alt="" />
      </div>
      <div className="flex-1 flex flex-row items-center gap-48px font-size-15px">
        {menus.map((m) => (
          <div
            className={clsx('cursor-pointer lh-40px', [
              m.title === 'Home' ? 'text-#F6F7F3' : 'text-#F6F7F34C hover:text-#F6F7F3',
            ])}
            key={m.title}
          >
            {m.title}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center gap-60px">
        <div className="flex flex-row items-center gap-30px">
          {medias.map((m) => (
            <img
              className={clsx('cursor-pointer')}
              key={m.title}
              src={m.img}
              alt={m.title}
              width={28}
              height={28}
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
          {LG(lang.LaunchApp)}
        </div>
      </div>
    </div>
  );
}

const medias = [
  {title: 'twitter', img: 'https://static.rate-x.io/img/v1/1e3b0b/twitter.png'},
  {title: 'telegram', img: 'https://static.rate-x.io/img/v1/dd0342/telegram.png'},
  {title: 'medium', img: 'https://static.rate-x.io/img/v1/80dfb2/medium.png'},
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
