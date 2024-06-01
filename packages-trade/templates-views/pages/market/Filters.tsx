import {filter$} from '@/streams/market/filter';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {assets$, contractMap$} from '@rx/streams/config';
import {Button, Tabs} from '@rx/widgets';
import {useEffect, useState} from 'react';

export function Filters() {
  const assets = useObservable(assets$, []);
  const contractMap = useObservable(contractMap$, {});

  const [asset, setAsset] = useState<string>('SOL');
  const [select, setSelect] = useStream(filter$);

  useEffect(() => {
    if (assets?.length > 0 && !asset) {
      setAsset(assets?.[0]?.symbolCategory);
    }
  }, [assets, asset]);

  return (
    <>
      <div className="w-100% b-solid b-b-1px b-gray-40 mt-32px">
        <Tabs
          className="h-48px"
          size="sm"
          options={assets?.map((a) => ({text: a.symbolCategory, value: a.symbolCategory}))}
          value={asset as string}
        ></Tabs>
      </div>
      <div className="flex flex-row items-center gap-8px mt-24px">
        <Button
          size="sm"
          type="default"
          selected={select === 'ALL'}
          onClick={() => setSelect('ALL')}
        >
          ALL
        </Button>
        {contractMap?.[asset]?.map((c) => (
          <Button
            size="sm"
            key={c.symbolCategory}
            type="default"
            selected={select === c.symbolCategory}
            onClick={() => setSelect(c.symbolCategory)}
          >
            {c.symbolCategory}
          </Button>
        ))}
      </div>
    </>
  );
}
