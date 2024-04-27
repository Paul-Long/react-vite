import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {RadioButton} from '@rx/widgets';
import {useState} from 'react';
import {EarnStrategies} from './EarnStrategies';
import {Filters} from './Filters';

export default function () {
  const {LG} = useLang();
  const [tab, setTab] = useState('Earn');
  return (
    <div className="flex flex-col w-1200px mx-auto max-w-100%">
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
  );
}
