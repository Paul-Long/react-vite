import {CardList} from '@/strategies/carry-trade/CardList';
import {DataList} from '@/strategies/carry-trade/DataList';
import {MintDialog} from '@/strategies/carry-trade/MintDialog';
import {TableBar} from '@/strategies/components/TableBar';
import {Title} from '@/strategies/components/Title';
import {Positions} from '@/strategies/positions';
import {showType$} from '@/strategies/streams';
import {useDialog} from '@rx/hooks/use-dialog';
import {useStream} from '@rx/hooks/use-stream';
import {Filters} from '@trade/components/assets-filter/Filters';

export function CarryTrade() {
  const modalHook = useDialog();
  const [type] = useStream(showType$);
  return (
    <div className="df fdc">
      <Title />
      <Filters />
      <TableBar />
      <div className="max-h420px overflow-y-auto">
        {type === 'card' && <CardList modalHook={modalHook} />}
        {type === 'list' && <DataList modalHook={modalHook} />}
        <MintDialog modalHook={modalHook} />
      </div>
      <Positions />
    </div>
  );
}
