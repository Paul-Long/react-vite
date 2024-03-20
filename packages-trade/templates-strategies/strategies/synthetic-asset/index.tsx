import {TableBar} from '@/strategies/components/TableBar';
import {Title} from '@/strategies/components/Title';
import {Positions} from '@/strategies/positions';
import {showType$} from '@/strategies/streams';
import {CardList} from '@/strategies/synthetic-asset/CardList';
import {DataList} from '@/strategies/synthetic-asset/DataList';
import {MintDialog} from '@/strategies/synthetic-asset/MintDialog';
import {useDialog} from '@rx/hooks/use-dialog';
import {useStream} from '@rx/hooks/use-stream';
import {Filters} from '@trade/components/assets-filter/Filters';

export function SyntheticAsset() {
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
