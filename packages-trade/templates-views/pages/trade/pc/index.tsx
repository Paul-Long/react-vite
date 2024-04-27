import {PlaceOrder} from '../place-order';
import {Positions} from '../positions';
import {Assets} from './Assets';
import {ChartWrap} from './ChartWrap';
import {SubAssetsSelect} from './ContractSelect';
import {Info} from './Info';

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
