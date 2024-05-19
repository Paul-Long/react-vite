import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {useState} from 'react';
import {CardTabs} from '../pc/CardTabs';
import {History} from './History';
import {Orders} from './Orders';
import {Position} from './Position';

export function Positions() {
  const {LG} = useLang();
  const [mode, setMode] = useState('YT');
  const [tab, setTab] = useState<string>('position');
  return (
    <div className="flex flex-col b-solid b-gray-40 b-t-1px box-border px-16px py-16px">
      <div className="w-300px">
        <CardTabs options={genTabs(LG)} value={tab} onChange={(t) => setTab(t)} />
      </div>
      <div className="flex overflow-hidden">
        {tab === 'position' && <Position mode={mode} />}
        {tab === 'orders' && <Orders mode={mode} />}
        {tab === 'history' && <History />}
      </div>
    </div>
  );
}

const genTabs = (LG: any) => [
  {label: LG(clang.Position), value: 'position'},
  {label: LG(clang.Orders), value: 'orders'},
  {label: LG(clang.History), value: 'history'},
];
