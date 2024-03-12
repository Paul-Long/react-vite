import {MarketOverview} from '@/market/market-overview';
import {PriceChart} from '@/market/price-chart';
import {ReferenceRate} from '@/market/reference-rate';
import {TermStructure} from '@/market/term-structure';
import {Page} from '@trade/components/page';
import React from 'react';

export function MarketTemplate() {
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
