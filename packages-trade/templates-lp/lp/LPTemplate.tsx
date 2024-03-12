import {useLang} from '@rx/hooks/use-lang';
import {Page} from '@trade/components/page';
import React from 'react';
import {Order} from './order';
import {PoolsMarket} from './pools-market';
import {Positions} from './positions';

export function LPTemplate() {
  const {LG} = useLang();
  return (
    <Page>
      <div className="flex-1 df fdr m-w100% min-h100%">
        <div className="flex-1 df fdc overflow-hidden">
          <PoolsMarket />
          <Positions />
        </div>
        <div className="min-w380px w380px" style={{background: '#001E3D'}}>
          <Order />
        </div>
      </div>
    </Page>
  );
}
