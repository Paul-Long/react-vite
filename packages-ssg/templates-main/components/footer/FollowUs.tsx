import {HOME_IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';
import {clsx} from 'clsx';

interface Props {
  align: 'left' | 'center' | 'right';
}

export function FollowUs(props: Props) {
  const {align = 'left'} = props;
  const {LG} = useLang();
  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          'font-size-16px text-gray-400',
          [align === 'center' && 'text-center'],
          [align === 'right' && 'text-right']
        )}
      >
        {LG(lang.FollowUs)}
      </div>
      <div
        className={clsx(
          'flex flex-row items-center mt-24px gap-24px',
          [align === 'center' && 'justify-center'],
          [align === 'right' && 'justify-end']
        )}
      >
        {genMedia().map((m) => (
          <img
            className="cursor-pointer"
            key={m.title}
            src={m.img}
            alt={m.title}
            width={48}
            height={48}
            onClick={() => !!m.link && window.open(m.link, '_blank', 'noopener')}
          />
        ))}
      </div>
    </div>
  );
}

const genMedia = () => {
  return [
    {
      title: 'Twitter',
      img: HOME_IMAGES.TWITTER,
      link: 'https://twitter.com/RateX_Dex',
    },
    {
      title: 'Discord',
      img: HOME_IMAGES.DISCORD,
      link: 'https://discord.com/invite/DuhAc4UP5x',
    },
    {
      title: 'Medium',
      img: HOME_IMAGES.MEDIUM,
      link: '',
    },
    {
      title: 'Telegram',
      img: HOME_IMAGES.TELEGRAM,
      link: 'https://t.me/RateXofficial',
    },
  ];
};