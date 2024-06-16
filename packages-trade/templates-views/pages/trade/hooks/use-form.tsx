import {current$} from '@/pages/trade/streams/streams';
import {calcInfo$, order$, swapLoading$} from '@/streams/calc-swap';
import {query$} from '@/streams/positions';
import {crossMargin$, waiverQuery$} from '@/streams/trade/cross-margin';
import {orderStatus$} from '@/streams/trade/order-status';
import {marketIndex$, twap$} from '@/streams/twap';
import {calcLiqPrice} from '@/streams/utils';
import {tradeApi} from '@rx/api/trade';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {RateClient} from '@rx/web3/sdk';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export function useForm() {
  const focus = useRef<string>('amount');
  const input = useRef<string>('amount');
  const [client] = useStream<RateClient>(rateXClient$);
  const twap: any = useObservable(twap$, {});
  const info = useObservable(calcInfo$, {});
  const [swapLoading] = useStream(swapLoading$);
  const crossMargin: any = useObservable(crossMargin$, {remainMargin: '0'});
  const baseContract = useObservable(current$, {});

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(initData());
  const [visible, setVisible] = useState(false);

  const amountN = useMemo(() => state.amount, [state]);
  const direction = useMemo(() => state.direction, [state]);
  const marginN = useMemo(() => state.margin, [state]);
  const leverageN = useMemo(() => state.leverage, [state]);
  const marketIndex = useMemo(() => state.marketIndex, [state]);
  const maxLeverage = useMemo(() => state.maxLeverage, [state]);
  const twapPrice = useMemo(() => twap?.[marketIndex], [twap, marketIndex]);

  const {connected} = useConnect();

  useEffect(() => {
    if (!baseContract || !client) {
      return;
    }
    input.current = 'amount';
    setState((prevState) => ({...prevState, marketIndex: baseContract.id}));
    marketIndex$.next(baseContract.id);
  }, [baseContract, client]);

  useEffect(() => {
    if (input.current !== 'amount' || focus.current !== 'amount') {
      return;
    }
    const key = [marketIndex, input.current, direction, amountN].join('_');
    if (key !== info?.key) {
      return;
    }
    const nextState: Record<string, any> = {};

    const max = calcMaxLeverage(direction, info);
    let leverage = leverageN;
    if (max !== maxLeverage) {
      nextState.maxLeverage = max;
      if (leverageN > max) {
        nextState.leverage = max;
        leverage = max;
      }
    }
    if (info.baseAssetAmount !== amountN) {
      nextState.amount = info.baseAssetAmount;
    }
    const margin = Big(info.baseAssetAmount)
      .times(info.entryPrice)
      .div(leverage)
      .round(9, 3)
      .toString();
    if (margin !== marginN) {
      nextState.margin = margin;
    }
    if (Object.keys(nextState).length > 0) {
      setState((prevState) => ({...prevState, ...nextState}));
    }
  }, [amountN, marginN, leverageN, direction, info, maxLeverage, marketIndex]);

  useEffect(() => {
    if (input.current !== 'margin' || focus.current !== 'margin' || !marginN) {
      return;
    }
    const key = [
      marketIndex,
      input.current,
      direction,
      Big(marginN).times(leverageN).toString(),
    ].join('_');
    if (key !== info?.key) {
      return;
    }
    const nextState: Record<string, any> = {};

    const max = calcMaxLeverage(direction, info);
    let leverage = leverageN;
    if (max !== maxLeverage) {
      nextState.maxLeverage = max;
      if (leverageN > max) {
        nextState.leverage = max;
        leverage = max;
      }
    }

    if (amountN !== info.baseAssetAmount) {
      nextState.amount = info.baseAssetAmount;
    }
    if (info.quoteAssetAmount) {
      const margin = Big(info.quoteAssetAmount).div(leverage).round(8, 0).toNumber();
      if (margin !== Number(marginN)) {
        nextState.margin = margin;
      }
    }
    if (Object.keys(nextState).length > 0) {
      setState((prevState) => ({...prevState, ...nextState}));
    }
  }, [amountN, marginN, leverageN, direction, info]);

  useEffect(() => {
    if (input.current === 'amount' && !!amountN && !!info?.baseAssetAmount && !!info?.entryPrice) {
      const margin = Big(info.baseAssetAmount)
        .times(info.entryPrice)
        .div(leverageN)
        .round(9, 3)
        .toString();
      if (margin !== marginN) {
        setState((prevState) => ({...prevState, margin}));
      }
    }
  }, [marginN, amountN, leverageN, info, marketIndex]);

  const info2 = useMemo<Record<string, any>>(() => {
    const data: Record<string, any> = {};
    if (!state.margin) {
      data.fee = '-';
    } else {
      data.fee = Big(!state.margin ? 0 : state.margin)
        .times(state.leverage)
        .times(0.001)
        .toFixed(9);
    }
    if (!!state.amount && !!state.margin && !!info?.entryPrice) {
      const st = Big(info.entryPrice)
        .times(state.amount || 0)
        .toNumber();
      data.lipPrice = calcLiqPrice(
        state.direction as any,
        baseContract.minimumMaintainanceCr,
        state.amount,
        st,
        state.margin
      );
    } else {
      data.lipPrice = '-';
    }
    return {...(info || {}), ...data};
  }, [baseContract, state, info]);

  const calcMaxLeverage = useCallback(
    (direction: string, info: Record<string, any>) => {
      if (!twapPrice) {
        return 10;
      }
      if (direction === 'LONG') {
        const denominator = Big(info.quoteAssetAmount)
          .times(1.05)
          .times(1.01)
          .minus(Big(twapPrice).times(info.baseAssetAmount))
          .abs();
        const max = Big(info.quoteAssetAmount).div(denominator).round(1, 0).toNumber();
        return Math.min(max, 10);
      }
      if (twapPrice < info.entryPrice) {
        return 10;
      }
      const denominator = Big(twapPrice)
        .times(info.baseAssetAmount)
        .times(1.05)
        .times(1.01)
        .minus(info.quoteAssetAmount)
        .abs();
      const max = Big(info.quoteAssetAmount).div(denominator).round(1, 0).toNumber();
      return Math.min(max, 10);
    },
    [twapPrice]
  );

  const handleChange = useCallback(
    (key: string) => {
      return (v: string | number | boolean) => {
        setState((prevState) => {
          const newState: any = {...prevState, [key]: v};
          if (key === 'amount') {
            input.current = key;
            !v && (newState.margin = '');
          }
          if (key === 'margin') {
            input.current = key;
            !v && (newState.amount = '');
          }
          return newState;
        });
      };
    },
    [state, baseContract, client]
  );

  useEffect(() => {
    if (input.current === 'margin' && !marginN) {
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
    if (info?.key !== key) {
      order$.next({...state, currentKey: input.current});
    }
  }, [state, info]);

  const handleSubmit = useCallback(
    async (checked: boolean = false) => {
      if (!connected) {
        walletModalVisible$.next(true);
        return;
      }
      if (!baseContract || loading) {
        return;
      }

      const start = Date.now();
      const {margin, marginType, direction, amount} = state;
      const remainMargin = Big(crossMargin?.remainMargin ?? 0);
      let newMargin: string | number = margin;
      newMargin = Big(newMargin).add(info2.fee).toString();

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
        marketIndex: baseContract.id,
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
    [connected, state, baseContract, client, info2]
  );

  return {
    input,
    focus,
    baseContract,
    state,
    info2,
    visible,
    handleChange,
    handleSubmit,
    loading,
    swapLoading,
    crossMargin,
    setVisible,
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
