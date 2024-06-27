import {calcInfo$, order$, swapLoading$} from '@/streams/calc-swap';
import {query$} from '@/streams/positions';
import {crossMargin$, waiverQuery$} from '@/streams/trade/cross-margin';
import {orderStatus$} from '@/streams/trade/order-status';
import {current$} from '@/streams/trade/page-state';
import {twap$} from '@/streams/twap';
import {calcLiqPrice} from '@/streams/utils';
import {CalcInfo} from '@/views/trade/trade-yield/place-order/CalcInfo';
import {DepositMargin} from '@/views/trade/trade-yield/place-order/DepositMargin';
import {Direction} from '@/views/trade/trade-yield/place-order/Direction';
import {ImpliedYieldAPY} from '@/views/trade/trade-yield/place-order/ImpliedYieldAPY';
import {Leverage} from '@/views/trade/trade-yield/place-order/Leverage';
import {OrderConfirm} from '@/views/trade/trade-yield/place-order/OrderConfirm';
import {OrderType} from '@/views/trade/trade-yield/place-order/OrderType';
import {YTInput} from '@/views/trade/trade-yield/place-order/YTInput';
import {tradeApi} from '@rx/api/trade';
import {DollarIcon} from '@rx/components/icons/DollarIcon';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {RateClient} from '@rx/web3/sdk';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
  const {
    input,
    focus,
    state,
    info,
    loading,
    swapLoading,
    visible,
    contract,
    setVisible,
    handleChange,
    handleSubmit,
  } = usePlaceOrder();

  return (
    <>
      <div className="w-408px flex flex-col border-l-1px border-solid border-#2C2D2D">
        <div className="flex flex-row items-center">
          <TrapezoidButton
            className={clsx('flex-1 py-15px', [state.marginType === 'CROSS' && 'right bg-#131315'])}
            onClick={() => handleChange('marginType')('CROSS')}
          >
            {LG(lang.CrossMargin)}
          </TrapezoidButton>
          <TrapezoidButton
            className={clsx('flex-1 py-15px', [
              state.marginType === 'ISOLATED' && 'left bg-#131315',
            ])}
            onClick={() => handleChange('marginType')('ISOLATED')}
          >
            {LG(lang.IsolatedMargin)}
          </TrapezoidButton>
        </div>
        <div className="flex flex-col w-full h-full bg-#131315">
          <Direction value={state.direction} onChange={handleChange('direction')} />
          <OrderType value={state.orderType} onChange={handleChange('orderType')} />
          <div className="w-full flex flex-col items-center px-20px py-12px  border-b-1px border-solid border-#2C2D2D">
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
            <ImpliedYieldAPY fixedRate={info?.priceImpact ?? '-'} />
          </div>
          <CalcInfo info={info} marginType={state.marginType} />
          <div className="w-full px-20px">
            <Button
              className="w-full"
              size="md"
              type="trade"
              loading={loading || swapLoading}
              disabled={loading || swapLoading}
              onClick={() => setVisible(true)}
            >
              <div className="flex flex-row items-center gap-10px fw-medium font-size-16px">
                <DollarIcon
                  background={state.direction === 'LONG' ? '#8DCC2F' : '#EC404A'}
                  color={state.direction === 'LONG' ? '#09090A' : '#F6F7F3'}
                />
                {LG(lang.Trade)}
              </div>
            </Button>
          </div>
        </div>
      </div>
      <OrderConfirm
        order={state}
        calcInfo={info}
        loading={loading}
        visible={visible}
        contract={contract}
        onClose={() => setVisible(false)}
        onConfirm={() => handleSubmit(false)}
      />
    </>
  );
}

function usePlaceOrder() {
  const focus = useRef<string>('amount');
  const input = useRef<string>('amount');

  const [client] = useStream<RateClient>(rateXClient$);
  const [swapLoading] = useStream(swapLoading$);
  const twap: any = useObservable(twap$, {});
  const calcInfo = useObservable(calcInfo$, {});
  const crossMargin: any = useObservable(crossMargin$, {remainMargin: '0'});
  const contract = useObservable(current$, null);

  const {connected} = useConnect();

  const [state, setState] = useState(initData());
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const amountN = useMemo(() => state.amount, [state]);
  const marginN = useMemo(() => state.margin, [state]);
  const leverageN = useMemo(() => state.leverage, [state]);
  const direction = useMemo(() => state.direction, [state]);
  const marketIndex = useMemo(() => state.marketIndex, [state]);
  const maxLeverage = useMemo(() => state.maxLeverage, [state]);
  const twapPrice = useMemo(() => twap?.[marketIndex], [twap, marketIndex]);

  const info = useMemo<Record<string, any>>(() => {
    const data: Record<string, any> = {};
    if (!state.margin) {
      data.fee = '-';
    } else {
      data.fee = Big(!state.margin ? 0 : state.margin)
        .times(state.leverage)
        .times(0.001)
        .toFixed(9);
    }
    if (!!state.amount && !!state.margin && !!calcInfo?.entryPrice) {
      const st = Big(calcInfo.entryPrice)
        .times(state.amount || 0)
        .toNumber();
      data.lipPrice = calcLiqPrice(
        state.direction as any,
        contract.minimumMaintainanceCr,
        state.amount,
        st,
        state.margin
      );
    } else {
      data.lipPrice = '-';
    }
    return {...(calcInfo || {}), ...data};
  }, [contract, state, calcInfo]);

  useEffect(() => {
    if (!contract) return;
    update({marketIndex: contract.id});
  }, [contract]);

  useEffect(() => {
    if (input.current !== 'amount' || focus.current !== 'amount') {
      return;
    }
    const key = [marketIndex, input.current, direction, amountN].join('_');
    if (key !== calcInfo?.key) {
      if ((!amountN || Number(amountN) === 0) && marginN !== '') {
        setState((prevState) => ({...prevState, margin: ''}));
      }
      return;
    }
    const nextState: Record<string, any> = {};

    const max = calcMaxLeverage(direction, calcInfo);
    let leverage = leverageN;
    if (max !== maxLeverage) {
      nextState.maxLeverage = max;
      if (leverageN > max) {
        nextState.leverage = max;
        leverage = max;
      }
    }
    if (calcInfo.baseAssetAmount !== amountN) {
      nextState.amount = calcInfo.baseAssetAmount;
    }
    const margin = Big(calcInfo.baseAssetAmount)
      .times(calcInfo.entryPrice)
      .div(leverage)
      .round(9, 3)
      .toString();
    if (margin !== marginN) {
      nextState.margin = margin;
    }
    if (Object.keys(nextState).length > 0) {
      setState((prevState) => ({...prevState, ...nextState}));
    }
  }, [amountN, marginN, leverageN, direction, calcInfo, maxLeverage, marketIndex]);

  useEffect(() => {
    if (
      input.current !== 'margin' ||
      focus.current !== 'margin' ||
      !marginN ||
      Number(marginN) === 0
    ) {
      return;
    }
    const key = [
      marketIndex,
      input.current,
      direction,
      Big(marginN).times(leverageN).toString(),
    ].join('_');
    if (key !== calcInfo?.key) {
      if ((!marginN || Number(marginN) === 0) && amountN !== '') {
        setState((prevState) => ({...prevState, amount: ''}));
      }
      return;
    }
    const nextState: Record<string, any> = {};

    const max = calcMaxLeverage(direction, calcInfo);
    let leverage = leverageN;
    if (max !== maxLeverage) {
      nextState.maxLeverage = max;
      if (leverageN > max) {
        nextState.leverage = max;
        leverage = max;
      }
    }

    if (amountN !== calcInfo.baseAssetAmount) {
      nextState.amount = calcInfo.baseAssetAmount;
    }
    if (calcInfo.quoteAssetAmount) {
      const margin = Big(calcInfo.quoteAssetAmount).div(leverage).round(8, 0).toNumber();
      if (margin !== Number(marginN)) {
        nextState.margin = margin;
      }
    }
    if (Object.keys(nextState).length > 0) {
      setState((prevState) => ({...prevState, ...nextState}));
    }
  }, [amountN, marginN, leverageN, direction, calcInfo]);

  useEffect(() => {
    if (
      input.current === 'amount' &&
      !!amountN &&
      Number(amountN) !== 0 &&
      !!calcInfo?.baseAssetAmount &&
      !!calcInfo?.entryPrice
    ) {
      const margin = Big(calcInfo.baseAssetAmount)
        .times(calcInfo.entryPrice)
        .div(leverageN)
        .round(9, 3)
        .toString();
      if (margin !== marginN) {
        setState((prevState) => ({...prevState, margin}));
      }
    }
  }, [marginN, amountN, leverageN, calcInfo, marketIndex]);

  useEffect(() => {
    if (input.current === 'margin' && (!marginN || Number(marginN) === 0)) {
      return;
    }
    if (input.current === 'amount' && !state.amount) {
      return;
    }
    let key: string = '';
    if (input.current === 'amount') {
      key = [state.marketIndex, input.current, state.direction, state.amount].join('_');
    }
    if (input.current === 'margin') {
      const margin = Big(state.margin).times(state.leverage).toString();
      key = [state.marketIndex, input.current, state.direction, margin].join('_');
    }
    if (calcInfo?.key !== key) {
      order$.next({...state, currentKey: input.current});
    }
  }, [state, calcInfo]);

  const calcMaxLeverage = useCallback(
    (direction: string, calcInfo: Record<string, any>) => {
      if (!twapPrice) {
        return 10;
      }
      if (direction === 'LONG') {
        const denominator = Big(calcInfo.quoteAssetAmount)
          .times(1.05)
          .times(1.01)
          .minus(Big(twapPrice).times(calcInfo.baseAssetAmount))
          .abs();
        const max = Big(calcInfo.quoteAssetAmount).div(denominator).round(1, 0).toNumber();
        return Math.min(max, 10);
      }
      if (twapPrice < calcInfo.entryPrice) {
        return 10;
      }
      const denominator = Big(twapPrice)
        .times(calcInfo.baseAssetAmount)
        .times(1.05)
        .times(1.01)
        .minus(calcInfo.quoteAssetAmount)
        .abs();
      const max = Big(calcInfo.quoteAssetAmount).div(denominator).round(1, 0).toNumber();
      return Math.min(max, 10);
    },
    [twapPrice]
  );

  const update = useCallback((record: Record<string, any>) => {
    setState((prevState) => ({...prevState, ...record}));
  }, []);

  const handleChange = useCallback(
    (key: string) => {
      return (v: string | number | boolean) => {
        setState((prevState) => {
          const newState: any = {...prevState, [key]: v};
          if (key === 'amount' && v !== state.amount) {
            input.current = key;
            (!v || Number(v) === 0) && (newState.margin = '');
          }
          if (key === 'margin' && v !== state.margin) {
            input.current = key;
            (!v || Number(v) === 0) && (newState.amount = '');
          }
          return newState;
        });
      };
    },
    [state]
  );

  const handleSubmit = useCallback(
    async (checked: boolean = false) => {
      if (!connected) {
        walletModalVisible$.next(true);
        return;
      }
      if (!contract || loading) {
        return;
      }

      const {margin, marginType, direction, amount} = state;
      const remainMargin = Big(crossMargin?.remainMargin ?? 0);
      let newMargin: string | number = margin;
      newMargin = Big(newMargin).add(info.fee).toString();

      if (state.marginWaiver && marginType === 'CROSS') {
        if (remainMargin.gt(newMargin)) {
          newMargin = 0;
        } else {
          newMargin = Big(newMargin).minus(remainMargin).toString();
        }
      }
      if (!amount) {
        return;
      }
      if (marginType === 'CROSS') {
        if (!state.marginWaiver && Big(newMargin).lte(0)) {
          return;
        }
      } else {
        if (Big(newMargin).lte(0)) {
          return;
        }
      }
      if (checked) {
        setVisible(true);
        return;
      }
      setLoading(true);
      const order = {
        marginType,
        direction,
        amount,
        marketIndex: contract.id,
        orderType: 'MARKET',
        margin: newMargin,
        openTip: () =>
          Toast.warn(
            <div className="max-w-446px text-wrap">
              A one-time (refundable) fee of 0.02 SOL will be charged to open a new account for this
              asset.
            </div>
          ),
      };
      console.log('Place Order Start : ', Date.now());
      const tx = await client.placeOrder2(order);
      if (tx === false) {
        Toast.warn('Order placement failed, please check current positions and orders.');
      }
      if (tx === 30001) {
        Toast.warn('CROSS position is less than 5 positions.');
      }
      if (tx && tx !== 30001) {
        try {
          await client.confirmTransaction(tx);
          await client.parsePlaceOrderView(tx, (event: string, data: any) => {
            orderStatus$.next({event, data});
          });
        } catch (e) {
          console.error(e);
        }
        await tradeApi.processSignature(tx);
        if (order.marginType === 'CROSS') {
          waiverQuery$.next(0);
        }
        query$.next(0);
      }
      updateBalance$.next(0);
      order$.next(null);
      setState((prevState) => ({...prevState, amount: '', margin: ''}));
      setLoading(false);
      setVisible(false);
    },
    [connected, state, contract, client, info]
  );

  return {
    input,
    focus,
    state,
    info,
    loading,
    visible,
    contract,
    setVisible,
    swapLoading,
    handleChange,
    handleSubmit,
  };
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
