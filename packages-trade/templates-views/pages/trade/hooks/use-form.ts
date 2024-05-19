import {current$} from '@/pages/trade/streams/streams';
import {calcInfo$, order$} from '@/streams/calc-swap';
import {query$} from '@/streams/positions';
import {marketIndex$, twap$} from '@/streams/twap';
import {tradeApi} from '@rx/api/trade';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export function useForm() {
  const current = useRef<string>('amount');
  const [client] = useStream(rateXClient$);
  const twap: any = useObservable(twap$, {});
  const info = useObservable(calcInfo$, {});
  const baseContract = useObservable(current$, {});

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(initData());

  const amountN = useMemo(() => state.amount, [state]);
  const marginN = useMemo(() => state.margin, [state]);
  const leverageN = useMemo(() => state.leverage, [state]);
  const marketIndex = useMemo(() => state.marketIndex, [state]);
  const price = useMemo(() => info.py, [info]);

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
    if (current.current === 'amount' && !!amountN && !!price) {
      const margin = Big(amountN).times(price).div(leverageN).round(9, 3).toNumber();
      setState((prevState: any) => {
        return {...prevState, margin};
      });
    }
    if (current.current === 'margin' && !!marginN) {
      if (!twap?.[marketIndex]) {
        return;
      }
      const t = twap?.[marketIndex];
      const amount = Big(marginN).times(leverageN).div(t).round(9, 0).toNumber();
      setState((prevState: any) => {
        return {...prevState, amount};
      });
    }
  }, [amountN, marginN, leverageN, marketIndex, price, twap]);

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
    order$.next(state);
  }, [state]);

  const handleSubmit = useCallback(async () => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (!baseContract || loading) {
      return;
    }
    const start = Date.now();
    const {margin, marginType, direction, amount} = state;
    if (!margin || !amount) {
      return;
    }
    setLoading(true);
    const order = {
      marginType,
      direction,
      amount,
      marketIndex: baseContract.id,
      orderType: 'MARKET',
      margin,
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
      query$.next(0);
    }
    setState((prevState) => ({...prevState, amount: '', margin: ''}));
    setLoading(false);
  }, [connected, state, baseContract, client]);

  return {state, info, current, handleChange, handleSubmit, loading};
}

function initData() {
  return {
    marginType: 'CROSS',
    direction: 'SHORT',
    amount: '',
    leverage: 1,
    margin: '',
    slippage: 1,
    marketIndex: 0,
    orderType: 'market',
    marginWaiver: true,
  };
}
