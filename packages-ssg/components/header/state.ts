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
    title: LG(lang.Trade),
    key: 'Trade',
  },
  {
    title: LG(lang.Earn),
    key: 'Earn',
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
