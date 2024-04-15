import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';
import {useMemo, useState} from 'react';

interface Props {
  defaultMenu?: string;
}

export function useMenus(props?: Props) {
  const {LG} = useLang();
  const [select, setSelect] = useState<string>(props?.defaultMenu ?? '');
  const menus = useMemo(() => genMenus(LG), [LG]);

  return {select, setSelect, menus};
}

interface Menu {
  title: string;
  key: string;
  children?: Menu[];
}

const genMenus = (LG: any): Menu[] => [
  {
    title: LG(lang.Products),
    key: 'Products',
    children: [
      {title: LG(lang.TradeYield), key: 'Trade_Yield'},
      {title: LG(lang.CreateYieldAsset), key: 'Create_Yield_Asset'},
      {title: LG(lang.BuildStrategyVault), key: 'Build_Strategy_Vault'},
    ],
  },
  {
    title: LG(lang.Governance),
    key: 'Governance',
  },
  {
    title: LG(lang.Protocol),
    key: 'Protocol',
  },
  {
    title: LG(lang.Docs),
    key: 'Docs',
  },
];
