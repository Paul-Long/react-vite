import {MarketOverview} from '@/dashboard/market-overview';
import {PriceChart} from '@/dashboard/price-chart';
import {ReferenceRate} from '@/dashboard/reference-rate';
import {TeamsStructure} from '@/dashboard/teams-structure';
import {useLang} from '@rx/hooks/use-lang';
import {Page} from '@rx/modules/page';
import React from 'react';

export function DashboardTemplate() {
  const {LG} = useLang();

  return (
    <Page>
      <div className="df fdc w100% min-h100%">
        <div className="df fdr jcsb">
          <div className="flex-1">
            <MarketOverview />
          </div>
          <ReferenceRate />
        </div>
        <div className="flex-1 df fdr jcsb box-border" style={{background: '#000F1D'}}>
          <PriceChart />
          <TeamsStructure />
        </div>
      </div>
    </Page>
  );
}
