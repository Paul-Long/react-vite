import {TableBar} from '@/strategy/components/TableBar';
import {Title} from '@/strategy/components/Title';
import {Positions} from '@/strategy/positions';
import {showType$} from '@/strategy/streams';
import {CardList} from '@/strategy/synthetic-asset/CardList';
import {DataList} from '@/strategy/synthetic-asset/DataList';
import {Filters} from '@rx-ssg/components/assets-filter/Filters';
import {useStream} from '@rx/hooks/use-stream';
import React from 'react';

export function SyntheticAsset() {
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
