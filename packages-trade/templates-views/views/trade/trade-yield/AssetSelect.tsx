import {SOLIcon} from '@rx/components/icons/SOLIcon';
import {SearchIcon} from '@rx/components/icons/SearchIcon';
import {useObservable} from '@rx/hooks/use-observable';
import {assets$} from '@rx/streams/config';

export function AssetSelect() {
  const assets = useObservable(assets$, []);
  return (
    <div className="box-border w-76px flex flex-col items-center border-r-1px border-solid border-#2C2D2D">
      <div className="box-border p-5px rounded-10px border-1px border-solid border-#2C2D2D mt-40px">
        <SearchIcon />
      </div>
      <div className="w-32px h-1px bg-gray-10 my-20px"></div>
      {assets.map((a) => (
        <div
          key={a.symbolCategory}
          className="box-border p-5px rounded-10px bg-lime-10 border-1px border-solid border-#2C2D2D"
        >
          <SOLIcon />
        </div>
      ))}
    </div>
  );
}
