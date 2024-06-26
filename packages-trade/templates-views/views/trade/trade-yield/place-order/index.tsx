import {DepositMargin} from '@/views/trade/trade-yield/place-order/DepositMargin';
import {Direction} from '@/views/trade/trade-yield/place-order/Direction';
import {ImpliedYieldAPY} from '@/views/trade/trade-yield/place-order/ImpliedYieldAPY';
import {Leverage} from '@/views/trade/trade-yield/place-order/Leverage';
import {OrderType} from '@/views/trade/trade-yield/place-order/OrderType';
import {YTInput} from '@/views/trade/trade-yield/place-order/YTInput';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {clsx} from 'clsx';
import {useCallback, useRef, useState} from 'react';
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
export function PlaceOrder() {
  const {LG} = useLang();
  const focus = useRef<string>('amount');
  const input = useRef<string>('amount');
  const {state, handleChange} = usePlaceOrder();

  return (
    <div className="w-408px flex flex-col border-l-1px border-solid border-#2C2D2D">
      <div className="flex flex-row items-center">
        <TrapezoidButton
          className={clsx('flex-1 py-15px', [state.marginType === 'CROSS' && 'right bg-#131315'])}
          onClick={() => handleChange('marginType')('CROSS')}
        >
          {LG(lang.CrossMargin)}
        </TrapezoidButton>
        <TrapezoidButton
          className={clsx('flex-1 py-15px', [state.marginType === 'ISOLATED' && 'left bg-#131315'])}
          onClick={() => handleChange('marginType')('ISOLATED')}
        >
          {LG(lang.IsolatedMargin)}
        </TrapezoidButton>
      </div>
      <div className="flex flex-col w-full h-full bg-#131315">
        <Direction value={state.direction} onChange={handleChange('direction')} />
        <OrderType value={state.orderType} onChange={handleChange('orderType')} />
        <div className="w-full flex flex-col items-center px-20px py-12px">
          <YTInput value={state.amount} onChange={handleChange('amount')} />
          <Leverage value={state.leverage} onChange={handleChange('leverage')} />
          <DepositMargin
            value={state.margin}
            onChange={(v) => {
              input.current = 'margin';
              handleChange('margin')(v);
            }}
            onFocus={() => (focus.current = 'margin')}
            marginType={state.marginType}
            marginWaiver={state.marginWaiver}
            onMarginWaiverChange={handleChange('marginWaiver')}
          />
          <ImpliedYieldAPY />
        </div>
      </div>
    </div>
  );
}

function usePlaceOrder() {
  const [state, setState] = useState(initData());

  const handleChange = useCallback(
    (key: string) => (value: string | number | boolean) => {
      setState((prevState) => ({...prevState, [key]: value}));
    },
    []
  );

  return {state, handleChange};
}

function initData() {
  return {
    marginType: 'ISOLATED',
    direction: 'LONG',
    amount: '',
    leverage: 1,
    maxLeverage: 10,
    margin: '',
    slippage: 1,
    marketIndex: 0,
    orderType: 'market',
    marginWaiver: true,
  };
}
