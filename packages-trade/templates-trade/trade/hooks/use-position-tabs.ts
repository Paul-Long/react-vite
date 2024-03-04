import {TabsValue} from '@/trade/positions/const';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {useCallback, useEffect, useState} from 'react';

export function usePositionTabs() {
  const {LG} = useLang();
  const [tab, setTab] = useState<string>(TabsValue.Position);
  const [tabs, setTabs] = useState<{text: string; key: string}[]>([]);

  useEffect(() => {
    setTabs(genTabs(LG));
  }, [LG]);

  const onChange = useCallback((tab: string) => setTab(tab), []);

  return {tab, tabs, onChange};
}

export const genTabs = (LG: any): any[] => [
  {text: LG(tradeLang.Position), key: TabsValue.Position},
  {text: LG(clang.Orders), key: TabsValue.Orders},
  {text: LG(clang.History), key: TabsValue.History},
];
