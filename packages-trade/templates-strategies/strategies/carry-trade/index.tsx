import {CardList} from '@/strategies/carry-trade/CardList';
import {DataList} from '@/strategies/carry-trade/DataList';
import {TableBar} from '@/strategies/components/TableBar';
import {Title} from '@/strategies/components/Title';
import {Positions} from '@/strategies/positions';
import {showType$} from '@/strategies/streams';
import {useStream} from '@rx/hooks/use-stream';
import {Filters} from '@trade/components/assets-filter/Filters';
import React from 'react';

export function CarryTrade() {
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
