import {AssetList} from '@/components/AssetList';
import {SpecificPool} from '@/views/trade/liquidity/SpecificPool';
import {clsx} from 'clsx';
import {useState} from 'react';

export default function () {
  const [contract, setContract] = useState('ALL');
  return (
    <div
      className={clsx(
        'flex flex-col w-1200px max-w-screen mx-auto mt-40px',
        'border-1px border-solid border-#2C2D2D'
      )}
    >
      <div className="flex flex-col px-20px pt-20px pb-10px border-b-1px border-b-solid border-b-#2C2D2D">
        <AssetList onContract={(con: string) => setContract(con)} />
      </div>
      <SpecificPool />
    </div>
  );
}
