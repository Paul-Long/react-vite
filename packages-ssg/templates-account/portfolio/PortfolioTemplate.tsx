import {Title} from '@/portfolio/components/Title';
import {LpAccount} from '@/portfolio/lp-account';
import {Overview} from '@/portfolio/overview';
import {StrategyAccount} from '@/portfolio/strategy-account';
import {YieldSwapAccount} from '@/portfolio/yield-swap-account';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {Page} from '@rx/modules/page';
import React from 'react';

export function PortfolioTemplate() {
  const {LG} = useLang();
  return (
    <Page>
      <div className="df fdc w100% p24px gap24px">
        <Title>{LG(lang.Overview)}</Title>
        <Overview />
        <YieldSwapAccount />
        <StrategyAccount />
        <LpAccount />
      </div>
    </Page>
  );
}
