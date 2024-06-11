import {PlaceOrder} from '../place-order';
import {Positions} from '../positions';
import {Assets} from './Assets';
import {SubAssetsSelect} from './ContractSelect';
import {Info} from './Info';
import {TradingViewChart} from './TradingViewChart';

export function TradePC() {
  return (
    <div className="w-full max-w-full">
      <div className="flex-1 flex flex-row justify-between bg-#030B0F min-h-full">
        <Assets />
        <div className="flex flex-1 flex-col b-x-1px b-solid b-x-gray-40 box-border h-fit overflow-x-hidden">
          <div className="flex flex-row items-center px-20px py-23px b-b-1px b-solid b-b-gray-40 gap-20px">
            <SubAssetsSelect />
            <Info />
          </div>
          {/* <ChartWrap /> */}
          <TradingViewChart />
          <Positions />
        </div>
        <PlaceOrder />
      </div>
    </div>
  );
}
