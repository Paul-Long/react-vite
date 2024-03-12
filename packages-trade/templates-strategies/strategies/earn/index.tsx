import {useStream} from '@rx/hooks/use-stream';
import {Filters} from '@trade/components/assets-filter/Filters';
import React from 'react';
import {TableBar} from '../components/TableBar';
import {Title} from '../components/Title';
import {Positions} from '../positions';
import {showType$} from '../streams';
import {CardList} from './CardList';
import {DataList} from './DataList';

export function Earn() {
  const [type] = useStream(showType$);
  return (
    <div className="df fdc">
      <Title />
      <Filters />
      <TableBar />
      <div className="max-h420px overflow-y-auto">
        {type === 'card' && <CardList />}
        {type === 'list' && <DataList />}
      </div>
      <Positions />
    </div>
  );
}
