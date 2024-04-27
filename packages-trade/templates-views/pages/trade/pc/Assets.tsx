import {ASSETS_IMAGES} from '@rx/const/images';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {assets$} from '@rx/streams/config';
import {clsx} from 'clsx';
import {asset$} from '../streams/streams';
import {Search} from './Search';

export function Assets() {
  const [asset, setAsset] = useStream(asset$);
  const assets = useObservable(assets$, []);

  return (
    <div className="flex flex-col w-280px max-w-280px  min-w-280px gap-24px">
      <div className="overflow-hidden flex px-24px mt24px">
        <Search />
      </div>
      <div className="flex flex-col text-#DEE4EE font-size-16px">
        {assets?.map((a) => (
          <div
            className={clsx(
              'flex flex-row items-center px-24px py-16px box-border b-r-4px b-s-solid gap-8px cursor-pointer',
              [asset === a.symbolCategory && 'bg-gray-80'],
              [asset === a.symbolCategory ? 'b-r-green-500' : 'b-r-transparent']
            )}
            onClick={() => setAsset(a.symbolCategory)}
          >
            <img src={ASSETS_IMAGES[a.symbolCategory]} alt="" width={24} height={24} />
            SOL
          </div>
        ))}
      </div>
    </div>
  );
}
