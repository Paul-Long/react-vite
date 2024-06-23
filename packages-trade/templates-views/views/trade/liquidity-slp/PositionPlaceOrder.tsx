import {IMAGES} from '@/pages/lp/const';
import {WalletBalance} from '@/views/trade/liquidity-slp/WalletBalance';
import {selectPosition$} from '@/views/trade/liquidity-slp/state';
import {InfoIcon} from '@rx/components/icons/InfoIcon';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button} from '@rx/widgets';
import {clsx} from 'clsx';
import {useState} from 'react';
import {styled} from 'styled-components';

const TrapezoidButton = styled.button`
  outline: none;
  &.left {
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
  }
  &.right {
    clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
  }
`;

export function PositionPlaceOrder() {
  const {LG} = useLang();
  const [position] = useStream(selectPosition$);
  console.log('select position : ', position);
  const [type, setType] = useState('Deposit');
  return (
    <div className="h-full flex flex-col border-1px border-solid border-#2C2D2D border-l-none">
      <div className="flex flex-row items-center">
        <TrapezoidButton
          className={clsx('flex-1 py-15px', [type === 'Withdraw' && 'right bg-#131315'])}
          onClick={() => setType('Withdraw')}
        >
          {LG(clang.Withdraw)}
        </TrapezoidButton>
        <TrapezoidButton
          className={clsx('flex-1 py-15px', [type === 'Deposit' && 'left bg-#131315'])}
          onClick={() => setType('Deposit')}
        >
          {LG(clang.Deposit)}
        </TrapezoidButton>
      </div>
      {type === 'Withdraw' && <Withdraw position={position} />}
      {type === 'Deposit' && <Deposit position={position} />}
    </div>
  );
}

function Withdraw({position}: {position: Record<string, any>}) {
  const {LG} = useLang();
  const {ammPosition} = position;
  const {lowerRate, upperRate} = ammPosition || {};
  return (
    <div className="w-full flex-1 bg-#131315 p-16px">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8px font-size-14px lh-18px fw-medium">
          <img
            src={IMAGES[position?.symbolLevel2Category.toUpperCase()]}
            alt={position?.symbol}
            width={20}
            height={20}
          />
          {position?.symbol}
        </div>
        <div>
          {!lowerRate ? '-' : numUtil.floor(lowerRate, 2, -2)}% ~{' '}
          {!upperRate ? '-' : numUtil.floor(upperRate, 2, -2)}%
        </div>
      </div>
      <div className="flex flex-row items-center gap-8px font-size-12px lh-18px py-12px border-b-1px border-b-solid border-b-#2C2D2D">
        <span className="text-gray-60">{LG(lang.YourLPPosition)}</span>
        <span className="text-yellow-500">{numUtil.floor(position?.total, 6)}</span>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img
              src={IMAGES[position?.symbolLevel2Category.toUpperCase()]}
              alt={position?.symbolLevel2Category}
              width={20}
              height={20}
            />
            {position?.symbolLevel2Category}
          </div>
        </div>
        <div className="font-size-16px text-yellow-500 fw-medium">
          <InfoIcon width={16} height={16} color="#F6F7F399" />
        </div>
      </div>
    </div>
  );
}

function Deposit({position}: {position: Record<string, any>}) {
  const {LG} = useLang();
  return (
    <div className="w-full flex-1 bg-#131315 p-16px">
      <div className="flex flex-row items-center gap-8px font-size-12px lh-18px pb-12px border-b-1px border-b-solid border-b-#2C2D2D">
        <span className="text-gray-60">{LG(lang.YourLPPosition)}</span>
        <span className="text-gray-500">{numUtil.floor(position?.total, 6)}</span>
      </div>
      <WalletBalance marketIndex={position?.id} currency={position?.symbolLevel2Category} />
      <Button size="lg" type="lime" className="w-full h-48px font-size-16px fw-medium mt-12px">
        {LG(clang.Deposit)}
      </Button>
    </div>
  );
}
