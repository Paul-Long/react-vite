import {SelectTypes} from '@/trade/components/select-types/SelectTypes';
import {usePositionTabs} from '@/trade/hooks/use-position-tabs';
import {History} from '@/trade/positions/History';
import {Orders} from '@/trade/positions/Orders';
import {Positions} from '@/trade/positions/Positions';
import {TabsValue} from '@/trade/positions/const';
import {Tabs} from '@rx/widgets';
import React from 'react';
import {PositionsWrap} from './styles';

export function PositionsView() {
  const {tab, tabs, onChange} = usePositionTabs();

  return (
    <PositionsWrap className="f1 overflow-hidden fw700">
      <Tabs options={tabs} onChange={onChange} size="small">
        {tab === TabsValue.Position && <SelectTypes />}
        {tab === TabsValue.Orders && <SelectTypes />}
      </Tabs>
      {tab === TabsValue.Position && <Positions />}
      {tab === TabsValue.Orders && <Orders />}
      {tab === TabsValue.History && <History />}
    </PositionsWrap>
  );
}
