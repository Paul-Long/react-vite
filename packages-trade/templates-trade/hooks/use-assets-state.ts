import {IMAGES} from '@rx/const/images';
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

const genAssets = (LG: Function): Chain[] => {
  return [
    {name: 'SOL', code: 'SOL', icon: IMAGES.sol},
    {name: 'ETH', code: 'ETH', icon: IMAGES.eth},
    {name: 'LRT', code: 'LRT', icon: IMAGES.lrt},
    {name: 'Points', code: 'Points', icon: IMAGES.lrt},
    {name: 'LP Token', code: 'LP Token', icon: IMAGES.bonk},
    {name: 'NFT', code: 'NFT', icon: IMAGES.nft},
    {name: 'Stables', code: 'Stables', icon: IMAGES.stables},
    {name: 'RWA', code: 'RWA', icon: IMAGES.rwa},
  ];
};
