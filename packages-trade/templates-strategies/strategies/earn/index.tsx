import {MintDialog} from '@/strategies/earn/MintDialog';
import {useDialog} from '@rx/hooks/use-dialog';
import {useStream} from '@rx/hooks/use-stream';
import {Filters} from '@trade/components/assets-filter/Filters';
import {TableBar} from '../components/TableBar';
import {Title} from '../components/Title';
import {Positions} from '../positions';
import {showType$} from '../streams';
import {CardList} from './CardList';
import {DataList} from './DataList';

export function Earn() {
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
