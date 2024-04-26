import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/strategy.lang';
import {assets$, contractMap$} from '@rx/streams/config';
import {Button, Tabs} from '@rx/widgets';
import {useEffect, useState} from 'react';

export function Filters() {
  const {LG} = useLang();
  const assets = useObservable(assets$, []);
  const contractMap = useObservable(contractMap$, {});

  const [asset, setAsset] = useState<string>('SOL');
  const [select, setSelect] = useState<string>('ALL');

  useEffect(() => {
    if (assets?.length > 0 && !asset) {
      setAsset(assets?.[0]?.symbolCategory);
    }
  }, [assets, asset]);

  return (
    <>
      <div className="w-100% b-solid b-b-1px b-gray-40 mt-24px">
        <Tabs
          className="h-48px"
          size="sm"
          options={assets?.map((a) => ({text: a.symbolCategory, value: a.symbolCategory}))}
          value={asset as string}
        ></Tabs>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8px mt-24px">
          <Button type="default" selected={select === 'ALL'} onClick={() => setSelect('ALL')}>
            ALL
          </Button>
          {contractMap?.[asset]?.map((c) => (
            <Button
              key={c.symbolCategory}
              type="default"
              selected={select === c.symbolCategory}
              onClick={() => setSelect(c.symbolCategory)}
            >
              {c.symbolCategory}
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center justify-end gap-8px">
          <Button type="default">
            {LG(lang.APR)}
            <i className="iconfont font-size-18px lh-18px">&#xe60c;</i>
          </Button>
          <Button type="default">
            {LG(lang.MaturityDate)}
            <i className="iconfont font-size-18px lh-18px">&#xe60c;</i>
          </Button>
          <Button type="default">
            <i className="iconfont font-size-18px lh-18px">&#xe60b;</i>
          </Button>
        </div>
      </div>
    </>
  );
}
