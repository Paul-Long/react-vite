import {useContract} from '@/trade/hooks/contract';
import {IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {useEffect, useState} from 'react';

type Chain = {name: string; code: string; icon: string};

export function useChains() {
  const {LG} = useLang();
  const [chains, setChains] = useState<Chain[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState('');
  const {chain, setChain} = useContract();

  useEffect(() => {
    const cs = genChains(LG).filter(
      (c) => !search || c.name.toLowerCase().includes(<string>search?.toLowerCase())
    );
    setChains(cs);
  }, [LG, search]);

  useEffect(() => {
    if (!selected && chains?.length > 0) {
      setSelected(chains[0]?.code);
    }
  }, [selected, chains]);

  return {chains, chain, setChain, setSearch};
}

const genChains = (LG: Function): Chain[] => {
  return [{name: 'Sol', code: 'SOL', icon: IMAGES.sol}];
};
