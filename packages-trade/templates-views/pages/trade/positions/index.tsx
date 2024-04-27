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
    <div className="min-h-280px flex-1 b-solid b-gray-40 b-t-1px box-border px-16px py-16px overflow-hidden">
      <CardTabs options={genTabs(LG)} value={tab} onChange={(t) => setTab(t)} />
      {tab === 'position' && <Position mode={mode} />}
      {tab === 'orders' && <Orders mode={mode} />}
      {tab === 'history' && <History />}
    </div>
  );
}

const genTabs = (LG: any) => [
  {label: LG(clang.Position), value: 'position'},
  {label: LG(clang.Orders), value: 'orders'},
  {label: LG(clang.History), value: 'history'},
];
