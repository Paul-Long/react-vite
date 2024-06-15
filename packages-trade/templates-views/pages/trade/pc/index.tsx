import {Info} from '@/pages/trade/pc/Info';
import {RecentTrades} from '@/pages/trade/pc/RecentTrades';
import {TradingViewChart} from '@/pages/trade/pc/TradingViewChart';
import {PlaceOrder} from '../place-order';
import {Positions} from '../positions';
import {Assets} from './Assets';
import {SubAssetsSelect} from './ContractSelect';

const rightBorder = 'border-r-1px';

export function TradePC() {
  return (
    <div className="w-full max-w-full">
      <div className="flex-1 flex flex-row justify-between bg-#030B0F min-h-full">
        <Assets />
        <div className="flex flex-1 flex-col box-border pr-24px overflow-x-hidden">
          <div className="flex flex-1 flex-col b-x-1px b-solid b-x-gray-40 box-border">
            <div className="flex flex-row items-center px-20px py-23px b-b-1px b-solid b-b-gray-40 gap-20px ">
              <SubAssetsSelect />
              <Info />
            </div>
            <div className="flex flex-row">
              <TradingViewChart />
              <RecentTrades />
            </div>
            <Positions />
          </div>
        </div>
        <PlaceOrder />
      </div>
    </div>
  );
}
