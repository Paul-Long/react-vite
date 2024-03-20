import {SelectTypes} from '@/trade/components/select-types/SelectTypes';
import {usePositionTabs} from '@/trade/hooks/use-position-tabs';
import {History} from '@/trade/positions/History';
import {Orders} from '@/trade/positions/Orders';
import {Positions} from '@/trade/positions/Positions';
import {TabsValue} from '@/trade/positions/const';
import {Tabs} from '@rx/widgets';
import React, {useState} from 'react';
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
