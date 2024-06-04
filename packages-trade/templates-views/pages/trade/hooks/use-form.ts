import {current$} from '@/pages/trade/streams/streams';
import {calcInfo$, order$, swapLoading$} from '@/streams/calc-swap';
import {query$} from '@/streams/positions';
import {crossMargin$, waiverQuery$} from '@/streams/trade/cross-margin';
import {marketIndex$, twap$} from '@/streams/twap';
import {tradeApi} from '@rx/api/trade';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export function useForm() {
  const current = useRef<string>('amount');
  const [client] = useStream(rateXClient$);
  const twap: any = useObservable(twap$, {});
  const info = useObservable(calcInfo$, {});
  const crossMargin: any = useObservable(crossMargin$, {remainMargin: '0'});
  const baseContract = useObservable(current$, {});
  const [swapLoading] = useStream(swapLoading$);

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(initData());
  const [visible, setVisible] = useState(false);

  const amountN = useMemo(() => state.amount, [state]);
  const direction = useMemo(() => state.direction, [state]);
  const marginN = useMemo(() => state.margin, [state]);
  const leverageN = useMemo(() => state.leverage, [state]);
  const marketIndex = useMemo(() => state.marketIndex, [state]);
  const maxLeverage = useMemo(() => state.maxLeverage, [state]);
  const entryPrice = useMemo(() => info.entryPrice, [info]);
  const sqrtPrice = useMemo(() => info.sqrtPrice, [info]);
  const baseAssetAmount = useMemo(() => info.baseAssetAmount, [info]);
  const quoteAssetAmount = useMemo(() => info.quoteAssetAmount, [info]);
  const maxAmount = useMemo(() => info?.maxAmount, [info]);
  const maxMargin = useMemo(() => info?.maxMargin, [info]);
  const fee = useMemo(() => info.fee, [info]);

  const {connected} = useConnect();

  useEffect(() => {
    if (!baseContract || !client) {
      return;
    }
    current.current = 'amount';
    setState((prevState) => ({...prevState, marketIndex: baseContract.id}));
    marketIndex$.next(baseContract.id);
  }, [baseContract, client]);

  useEffect(() => {
    const twapPrice = twap?.[marketIndex];
    let amount = amountN;
    if (current.current === 'amount' && !!amountN && !!entryPrice && twapPrice !== undefined) {
      const nextState: Record<string, any> = {};
      let margin = Big(amount).times(entryPrice).div(leverageN).round(9, 3).toNumber();
      if (twapPrice && quoteAssetAmount > 0) {
        const twapCr = Big(twapPrice)
          .times(baseAssetAmount)
          .add(margin)
          .div(quoteAssetAmount)
          .toString();
        console.log('Twap CR : ', twapCr);
      }
      nextState.margin = margin;
      nextState.leverage = leverageN;
      nextState.maxLeverage = maxLeverage;
      if (direction === 'LONG') {
        const denominator = Big(quoteAssetAmount)
          .times(1.05)
          .times(1.01)
          .minus(Big(twapPrice).times(baseAssetAmount));
        const max = Big(quoteAssetAmount).div(denominator).round(1, 0).toNumber();
        if (max < leverageN && max > 1.4) {
          nextState.leverage = max;
        }
        if (max > 1.4) {
          nextState.maxLeverage = Math.min(max, 10);
        }
        console.log('Long Max Leverage : ', max, maxLeverage, denominator.toString());
      } else {
        if (twapPrice < entryPrice) {
          nextState.maxLeverage = 10;
        } else {
          const denominator = Big(twapPrice)
            .times(baseAssetAmount)
            .times(1.05)
            .times(1.01)
            .minus(quoteAssetAmount);
          const max = Big(quoteAssetAmount).div(denominator).round(1, 0).toNumber();
          if (max < leverageN && max > 1.4) {
            nextState.leverage = max;
          }
          nextState.maxLeverage = Math.min(max, 10);
          console.log('Short Max Leverage : ', max, maxLeverage, denominator.toString());
        }
      }
      nextState.margin = Big(amount)
        .times(entryPrice)
        .div(nextState.leverage)
        .round(9, 3)
        .toNumber();
      setState((prevState: any) => ({...prevState, ...nextState}));
    }
    if (current.current === 'margin' && !!marginN) {
      if (!!baseAssetAmount) {
        const amount = Big(baseAssetAmount).round(6, 0).toString();
        setState((prevState: any) => {
          return {
            ...prevState,
            amount,
          };
        });
      }
    }
  }, [
    amountN,
    marginN,
    leverageN,
    marketIndex,
    direction,
    entryPrice,
    sqrtPrice,
    twap,
    maxLeverage,
  ]);

  useEffect(() => {
    console.log(
      'reset input value : ',
      amountN > maxAmount,
      amountN,
      marginN,
      maxAmount,
      maxMargin,
      swapLoading
    );
    if (swapLoading) {
      return;
    }
    if (current.current === 'amount' && !!maxAmount && !!amountN && Big(amountN).gt(maxAmount)) {
      console.log('change amount by max value : ', amountN, maxAmount);
      // setState((prevState) => ({...prevState, amount: maxAmount}));
    }
    if (current.current === 'margin' && !!marginN && !!maxMargin && Big(marginN).gt(maxMargin)) {
      console.log('change margin by max value : ', marginN, maxMargin);
      // setState((prevState) => ({...prevState, margin: maxMargin}));
    }
  }, [amountN, marginN, maxAmount, maxMargin, swapLoading]);

  const handleChange = useCallback(
    (key: string) => {
      return (v: string | number | boolean) => {
        setState((prevState) => {
          const newState: any = {...prevState, [key]: v};
          if (key === 'amount') {
            current.current = key;
            !v && (newState.margin = '');
          }
          if (key === 'margin') {
            current.current = key;
            !v && (newState.amount = '');
          }
          return newState;
        });
      };
    },
    [state, baseContract, client]
  );

  useEffect(() => {
    order$.next({...state, currentKey: current.current});
  }, [state]);

  const handleSubmit = useCallback(
    async (checked: boolean = false) => {
      if (!connected) {
        walletModalVisible$.next(true);
        return;
      }
      if (!baseContract || loading) {
        return;
      }

      if (checked) {
        setVisible(true);
        return;
      }
      const start = Date.now();
      const {margin, marginType, direction, amount} = state;
      let newMargin: string | number = margin;
      newMargin = Big(newMargin).add(fee).toString();
      if (state.marginWaiver && marginType === 'CROSS') {
        newMargin =
          crossMargin?.remainMargin > newMargin
            ? 0
            : Big(newMargin)
                .minus(crossMargin?.remainMargin ?? '0')
                .toNumber();
      }
      if (!state.marginWaiver && !margin) {
        return;
      }
      if (marginType === 'CROSS' && !crossMargin?.remainMargin && !margin) {
        return;
      }

      if (!state.marginWaiver && (!newMargin || Number(newMargin) < 0)) {
        return;
      }

      if (!amount) {
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
      };
      console.log('Place Order Start : ', Date.now());
      const tx = await client.placeOrder2(order);
      if (tx === false) {
        Toast.warn('Order placement failed, please check current positions and orders.');
      }
      if (tx) {
        await tradeApi.processSignature(tx);
        Toast.success(
          `Place Order success ${Big(Date.now() - start)
            .div(1000)
            .toFixed(1)}s`
        );
        if (order.marginType === 'CROSS') {
          waiverQuery$.next(0);
        }
        query$.next(0);
      }
      updateBalance$.next(0);
      setState((prevState) => ({...prevState, amount: '', margin: ''}));
      setLoading(false);
      setVisible(false);
    },
    [connected, state, baseContract, client, fee]
  );

  return {
    baseContract,
    state,
    info,
    visible,
    current,
    handleChange,
    handleSubmit,
    loading,
    crossMargin,
    setVisible,
  };
}

function initData() {
  return {
    marginType: 'CROSS',
    direction: 'SHORT',
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
