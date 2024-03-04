import {SLUGS} from '@rx/const/slugs';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {url$} from '@rx/streams/url';
import {useEffect, useState} from 'react';

export function useHeaderState() {
  const {LG} = useLang();
  const [menus, setMenus] = useState([]);
  useEffect(() => {});
}

interface Menu {
  text: string;
  value: string;
  pathname: string;
  isHidden?: boolean;
}

export function useMenus() {
  const {LG} = useLang();
  const [menus, setMenus] = useState<Menu[]>(genMenus(LG));
  const [selected, setSelected] = useState();

  useEffect(() => {
    const subscription = url$.subscribe((u: any) => {
      const menus = genMenus(LG);
      const menu = menus.find((m) => m.pathname === u.slug);
      if (menu) {
        setSelected(<any>menu.value);
        setMenus(() => genMenus(LG));
      }
    });
    return () => subscription.unsubscribe();
  }, [LG]);

  return {menus, selected};
}

const genMenus = (LG: any) => [
  {text: LG(clang.Market), value: 'Market', pathname: SLUGS.Home},
  {text: LG(clang.TradeYield), value: 'Trade', pathname: SLUGS.Trade},
  {text: LG(clang.LP), value: 'LP', pathname: SLUGS.Liquidity},
  {text: LG(clang.Strategies), value: 'Strategy', pathname: SLUGS.Strategy},
  {text: LG(clang.Account), value: 'Account', pathname: SLUGS.Portfolio},
];

const LANGUAGES = [
  {text: 'EN', value: 'en'},
  {text: 'ZH', value: 'zh'},
];
