import {MarketOverview} from '@/dashboard/market-overview';
import {PriceChart} from '@/dashboard/price-chart';
import {ReferenceRate} from '@/dashboard/reference-rate';
import {TermStructure} from '@/dashboard/term-structure';
import {useLang} from '@rx/hooks/use-lang';
import {Page} from '@rx/modules/page';
import React from 'react';

export function DashboardTemplate() {
  const {LG} = useLang();

  return (
    <Page>
      <div className="df fdc w100% min-h100%">
        <div className="df fdr jcsb">
          <div className="flex-1" style={{borderBottom: '1px solid #333'}}>
            <MarketOverview />
          </div>
          <ReferenceRate />
        </div>
        <div className="flex-1 df fdr jcsb box-border min-h400px" style={{background: '#00162B'}}>
          <PriceChart />
          <TermStructure />
        </div>
      </div>
    </Page>
  );
}
