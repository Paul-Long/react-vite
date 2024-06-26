import {ContractSelect} from '@/views/trade/trade-yield/ContractSelect';
import {LastSnapshot} from '@/views/trade/trade-yield/LastSnapshot';
import {MaturitySelect} from '@/views/trade/trade-yield/MaturitySelect';

export function MarketGrid() {
  return (
    <div className="flex flex-row items-center p-10px gap-56px border-b-1px border-solid border-#2C2D2D">
      <div className="flex flex-row items-center gap-10px">
        <ContractSelect />
        <MaturitySelect />
      </div>
      <LastSnapshot />
    </div>
  );
}
