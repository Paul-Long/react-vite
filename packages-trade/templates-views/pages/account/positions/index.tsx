import {LPPositions} from '@/pages/account/positions/LPPositions';
import {Positions} from '@/pages/trade/positions';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';
import {Tabs} from '@rx/widgets';
import {useState} from 'react';

enum Tab {
  YieldSwapAccount = 'YieldSwapAccount',
  EarnAccount = 'EarnAccount',
  LiquidityAccount = 'LiquidityAccount',
}

export function PositionsWrap() {
  const {LG} = useLang();
  const [value, setValue] = useState<Tab>(Tab.YieldSwapAccount);
  return (
    <div className="flex flex-col w-full mt-40px">
      <Tabs
        size="sm"
        className="h-40px"
        options={getTabs(LG)}
        value={value}
        onChange={(v) => setValue(v)}
      ></Tabs>
      {value === Tab.YieldSwapAccount && <Positions></Positions>}
      {value === Tab.LiquidityAccount && <LPPositions></LPPositions>}
    </div>
  );
}

const getTabs = (LG: Function) => [
  {text: LG(lang.YieldSwapAccount), value: Tab.YieldSwapAccount},
  {text: LG(lang.LiquidityAccount), value: Tab.LiquidityAccount},
  {text: LG(lang.EarnAccount), value: Tab.EarnAccount},
];
