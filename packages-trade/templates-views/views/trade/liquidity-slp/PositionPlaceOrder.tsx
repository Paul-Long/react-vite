import {selectPosition$} from '@/views/trade/liquidity-slp/state';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
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
    <div className="flex flex-col border-1px border-solid border-#2C2D2D border-l-none">
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
      {type === 'Withdraw' && <Withdraw />}
      {type === 'Deposit' && <Deposit />}
    </div>
  );
}

function Withdraw() {
  return <div className="w-full bg-#131315 p-16px"></div>;
}

function Deposit() {
  return <div className="w-full bg-#131315 p-16px"></div>;
}
