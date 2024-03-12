import {LivePosition} from '@/lp/positions/LivePosition';
import {ResidualPosition} from '@/lp/positions/ResidualPosition';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {RadioButtonGroup} from '@rx/widgets';
import React, {useCallback, useState} from 'react';

export function Positions() {
  const {LG} = useLang();
  const [selected, setSelected] = useState('Live');

  const genOptions = useCallback(() => {
    return [
      {text: LG(lang.LiveLPPosition), value: 'Live'},
      {
        text: LG(lang.ResidualLPPosition),
        value: 'Residual',
      },
    ];
  }, []);

  return (
    <div className="flex-1 df fdc B1 mt20px">
      <div className="w480px mt32px ml22px mb32px">
        <RadioButtonGroup
          options={genOptions()}
          value={selected}
          size="large"
          onChange={(v: string) => setSelected(v)}
        />
      </div>
      {selected === 'Live' && <LivePosition />}
      {selected === 'Residual' && <ResidualPosition />}
    </div>
  );
}
