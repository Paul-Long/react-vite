import {usePositionTabs} from '@/hooks/use-position-tabs';
import {SelectTypes} from '@/views/components/select-types/SelectTypes';
import {History} from '@/views/positions/History';
import {Orders} from '@/views/positions/Orders';
import {Positions} from '@/views/positions/Positions';
import {TabsValue} from '@/views/positions/const';
import {Tabs} from '@rx/widgets';
import {useState} from 'react';
import {PositionsWrap} from './styles';

export function PositionsView() {
  const [mode, setMode] = useState('YT');
  const {tab, tabs, onChange} = usePositionTabs();

  return (
    <PositionsWrap className="f1 overflow-hidden fw700">
      <Tabs options={tabs} onChange={onChange} size="small">
        <div className="mr24px">
          <SelectTypes value={mode} onChange={(v: string) => setMode(v)} />
        </div>
      </Tabs>
      {tab === TabsValue.Position && <Positions mode={mode} />}
      {tab === TabsValue.Orders && <Orders mode={mode} />}
      {tab === TabsValue.History && <History />}
    </PositionsWrap>
  );
}
