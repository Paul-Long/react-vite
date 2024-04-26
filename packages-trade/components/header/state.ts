import {SLUGS} from '@rx/const/slugs';
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
  text: string;
  value: string;
}

const genMenus = (LG: any): Menu[] => [
  {
    text: LG(lang.Market),
    value: SLUGS.Home,
  },
  {
    text: LG(lang.TradeYield),
    value: SLUGS.Trade,
  },
  {
    text: LG(lang.LP),
    value: SLUGS.Liquidity,
  },
  {
    text: LG(lang.Strategies),
    value: SLUGS.Strategy,
  },
  {
    text: LG(lang.Account),
    value: SLUGS.Account,
  },
];
