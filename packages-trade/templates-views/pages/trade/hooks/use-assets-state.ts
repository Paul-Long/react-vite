import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {assets$} from '@rx/streams/config';
import {useEffect, useState} from 'react';

type Chain = {name: string; code: string; icon: string};

export function useAssetsState() {
  const {LG} = useLang();
  const assetsAll = useObservable<ConfigCategory[]>(assets$, []);
  const [assets, setAssets] = useState<ConfigCategory[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const cs = assetsAll.filter(
      (c) => !search || c.symbolCategory.toLowerCase().includes(<string>search?.toLowerCase())
    );
    setAssets(cs);
  }, [LG, search, assetsAll]);

  return {assets, setSearch, assetsAll};
}
