import {useLang} from '@rx/hooks/use-lang';
import {Page} from '@rx/modules/page';
import {Order} from './order';
import {PoolsMarket} from './pools-market';
import {Positions} from './positions';

export function LiquidityTemplate() {
  const {LG} = useLang();
  return (
    <Page>
      <div className="df fdr min-h100%">
        <div className="flex-1 df fdc">
          <PoolsMarket />
          <Positions />
        </div>
        <div className="min-w380px">
          <Order />
        </div>
      </div>
    </Page>
  );
}
