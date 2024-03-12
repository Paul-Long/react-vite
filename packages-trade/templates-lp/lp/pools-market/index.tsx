import {Filters} from '@trade/components/assets-filter/Filters';
import React from 'react';
import {PoolList} from './PoolList';
import {Title} from './Title';

export function PoolsMarket() {
  return (
    <div className="df fdc B1">
      <Title />
      <Filters />
      <PoolList />
    </div>
  );
}
