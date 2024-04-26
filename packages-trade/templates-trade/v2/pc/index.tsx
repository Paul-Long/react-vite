import {Assets} from '@/v2/pc/Assets';
import {ChartWrap} from '@/v2/pc/ChartWrap';
import {SubAssetsSelect} from '@/v2/pc/ContractSelect';
import {Info} from '@/v2/pc/Info';
import {PlaceOrder} from '@/v2/place-order';
import {Positions} from '@/v2/positions';

export function TradePC() {
  return (
    <div className="flex-1 flex flex-row justify-between max-w-100% overflow-y-auto">
      <Assets />
      <div className="flex-1 flex flex-col b-x-1px b-solid b-x-gray-40 box-border overflow-hidden">
        <div className="flex flex-row items-center px-20px py-23px b-b-1px b-solid b-b-gray-40 gap-50px">
          <SubAssetsSelect />
          <Info />
        </div>
        <ChartWrap />
        <Positions />
      </div>
      <PlaceOrder />
    </div>
  );
}
