import {EarnStrategies} from '@/views/EarnStrategies';
import {Filters} from '@/views/Filters';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {RadioButton} from '@rx/widgets';
import {Page} from '@trade/components/page';
import {Content} from '@trade/components/page/Content';
import {useState} from 'react';

export function StrategyView() {
  const {LG} = useLang();
  const [tab, setTab] = useState('Earn');
  return (
    <Page>
      <Content>
        <div className="flex flex-col w-1200px mx-auto">
          <div className="w-564px max-w-100% mt-36px">
            <RadioButton
              value={tab}
              onChange={(v) => setTab(v)}
              options={[
                {label: LG(lang.Earn), value: 'Earn'},
                {label: LG(lang.CarryTrade), value: 'CarryTrade'},
                {label: LG(lang.SyntheticAsset), value: 'SyntheticAsset'},
              ]}
            />
          </div>
          <Filters />
          <EarnStrategies />
        </div>
      </Content>
    </Page>
  );
}
