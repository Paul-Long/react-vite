import {ASSETS_IMAGES} from '@rx/const/images';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {assets$} from '@rx/streams/config';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';
import {styled} from 'styled-components';
import {asset$, resize$} from '../streams/streams';
import {Search} from './Search';

const TrapezoidStyled = styled.div`
  top: calc(50% - 19px);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 14px solid #ffffff14;
  transition: all 0.5s ease;
`;

export function Assets() {
  const [asset, setAsset] = useStream(asset$);
  const assets = useObservable(assets$, []);
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    resize$.next(0);
  }, [show]);

  return (
    <div className={clsx('relative flex flex-col gap-24px', [show ? 'w-170px' : 'w-20px'])}>
      {show && (
        <div className={clsx('overflow-hidden flex px-24px mt24px')}>
          <Search />
        </div>
      )}
      {show && (
        <div className={clsx('flex flex-col text-#DEE4EE font-size-16px')}>
          {assets?.map((a) => (
            <div
              key={a.symbolCategory}
              className={clsx(
                'flex flex-row items-center px-24px py-16px lh-18px box-border b-r-4px b-s-solid gap-8px cursor-pointer',
                [asset === a.symbolCategory && 'bg-gray-80'],
                [asset === a.symbolCategory ? 'b-r-green-500' : 'b-r-transparent']
              )}
              onClick={() => setAsset(a.symbolCategory)}
            >
              <img src={ASSETS_IMAGES[a.symbolCategory]} alt="" width={24} height={24} />
              {a.symbolCategory}
            </div>
          ))}
        </div>
      )}
      <TrapezoidStyled
        className="absolute top-200px right-0 w-18px h-38px cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <i
          className={clsx(
            'absolute top-10px right-[-12px] iconfont font-size-10px lh-10px text-white',
            [show ? 'transform-rotate-180deg' : '']
          )}
        >
          &#xe63c;
        </i>
      </TrapezoidStyled>
    </div>
  );
}
