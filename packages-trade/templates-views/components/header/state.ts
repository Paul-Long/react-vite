import {SLUGS} from '@rx/const/slugs';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';
import {useMemo, useState} from 'react';

interface Props {
  defaultMenu?: string;
}

export function useMenus(props?: Props) {
  const {LG} = useLang();
  const {fixLink, slug} = useFixLink();
  const [select, setSelect] = useState<string>(slug);
  const menus = useMemo(() => genMenus(LG, fixLink as any), [LG]);

  return {select, setSelect, menus};
}

interface Menu {
  text: string;
  value: string;
  link: string;
}

const genMenus = (LG: any, fixLink: (l: string) => string): Menu[] => [
  {
    text: LG(lang.Market),
    value: SLUGS.Home,
    link: fixLink(SLUGS.Home),
  },
  {
    text: LG(lang.TradeYield),
    value: SLUGS.Trade,
    link: fixLink(SLUGS.Trade),
  },
  {
    text: LG(lang.Liquidity),
    value: SLUGS.Liquidity,
    link: fixLink(SLUGS.Liquidity),
  },
  {
    text: LG(lang.Earn),
    value: SLUGS.Earn,
    link: fixLink(SLUGS.Earn),
  },
  {
    text: LG(lang.SynthStables),
    value: SLUGS.SynthStables,
    link: fixLink(SLUGS.SynthStables),
  },
  {
    text: LG(lang.Account),
    value: SLUGS.Account,
    link: fixLink(SLUGS.Account),
  },
];
