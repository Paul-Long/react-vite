import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {RadioButtonGroup} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {DataList} from './DataList';

export function Positions() {
  const {LG} = useLang();
  const [selected, setSelected] = useState('positions');

  const genOptions = useCallback(() => {
    return [
      {text: LG(lang.YourLPPosition), value: 'positions'},
      {
        text: LG(lang.Unwithdrawable),
        value: 'unwithdrawable',
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
      <DataList />
    </div>
  );
}
