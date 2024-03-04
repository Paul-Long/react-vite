import React from 'react';
import {Filters} from '../components/Filters';
import {TableBar} from '../components/TableBar';
import {Title} from '../components/Title';
import {CardList} from './CardList';
import {useStream} from '@rx/hooks/use-stream';
import {showType$} from '../streams';
import {DataList} from './DataList';

export function Earn() {
  const [type] = useStream(showType$)
  return (
    <div className="df fdc">
      <Title />
      <Filters />
      <TableBar />
      {type === 'card' && <CardList />}
      {type === 'list' && <DataList />}
    </div>
  );
}
