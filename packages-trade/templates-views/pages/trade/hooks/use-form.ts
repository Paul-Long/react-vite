import {query$} from '@/streams/positions';
import {tradeApi} from '@rx/api/trade';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {ttmMap$} from '@rx/streams/epoch';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useContract} from '../hooks/use-contract';

export function useForm() {
  const current = useRef<string>('amount');
  const timer = useRef<any>(null);
  const twapTimer = useRef<any>(null);

  const [client] = useStream(rateXClient$);
  const [twap, setTwap] = useState();
  const [info, setInfo] = useState<any>({});
  const ttmMap = useObservable<Record<string, any>>(ttmMap$, {});

  const {baseContract} = useContract();

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    marginType: 'CROSS',
    direction: 'SHORT',
    amount: 1,
    leverage: 1,
    margin: 1,
    slippage: 1,
  });

  const {connected} = useConnect();

  useEffect(() => {
    if (!baseContract || !client) {
      return;
    }
    current.current = 'amount';
    getTwap().then();
    genSwap(state);
  }, [baseContract, client]);

  useEffect(() => {
    if (!twap) {
      return;
    }
    if (current.current === 'amount' && !!state.amount) {
      const margin = Big(state.amount).times(twap).div(state.leverage).round(9, 3).toNumber();
      setState((prevState) => {
        return {...prevState, margin};
      });
    }
    if (current.current === 'margin' && !!state.margin) {
      const amount = Big(state.margin).times(state.leverage).div(twap).round(9, 0).toNumber();
      setState((prevState) => {
        return {...prevState, amount};
      });
    }
  }, [state.amount, state.margin, state.leverage, twap]);

  const handleChange = useCallback(
    (key: string) => {
      return (v: string | number) => {
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
          if (['amount', 'margin', 'leverage', 'marginType', 'direction'].includes(key)) {
            genSwap(newState);
            getTwap().then();
            setInfo((prevState: any) => {
              const fee = Big(newState?.amount || 0)
                .times(0.005)
                .toFixed(4);
              return {...prevState, fee};
            });
          }
          return newState;
        });
      };
    },
    [state, baseContract, client]
  );

  const genSwap = useCallback(
    (state: any) => {
      if (state.amount <= 0 || !baseContract) {
        return;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(async () => {
        const marketIndex = baseContract.id;
        const key = [
          baseContract.symbolLevel1Category,
          baseContract.symbolLevel2Category,
          baseContract.term,
        ].join('_');

        const res = await client.simulatePlaceOrder({
          amount: state.amount,
          direction: state.direction,
          marketIndex,
          days: ttmMap?.[key]?.days,
        });
        setInfo((prevState: any) => {
          const st = Big(res.py).times(state.amount).toNumber();
          let lipPrice = '-';
          if (state.marginType === 'ISOLATED') {
            lipPrice = calcLiqPrice(state.direction as any, 1.05, state.amount, st, state.margin);
          }
          return {...prevState, ...(res ?? {}), lipPrice};
        });
        console.log('Simulate Place Order : result ', res);

        clearTimeout(timer.current);
        timer.current = null;
      }, 100);
    },
    [baseContract, client, ttmMap]
  );

  const getTwap = useCallback(async () => {
    if (!baseContract || !client) {
      return;
    }
    if (twapTimer.current) {
      return;
    }
    const t = await client.getAmmTwap({marketIndex: baseContract.id});
    if (t) {
      setTwap(t);
      twapTimer.current = setTimeout(() => {
        clearTimeout(twapTimer.current);
        twapTimer.current = null;
      }, 30 * 1000);
    }
  }, [client, twap]);

  const handleSubmit = useCallback(async () => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (!baseContract || loading) {
      return;
    }
    setLoading(true);
    const start = Date.now();
    const {margin, marginType, direction, amount} = state;
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
    setLoading(false);
  }, [connected, state, baseContract, client]);

  return {state, info, handleChange, handleSubmit, loading};
}

function calcLiqPrice(
  direction: 'LONG' | 'SHORT',
  mcr: number,
  yt: number,
  st: number,
  margin: number
) {
  if (direction === 'LONG') {
    return Big(mcr * Math.abs(st) - margin)
      .div(yt)
      .toFixed(9);
  }
  return Big(Math.abs(st) + margin)
    .div(mcr * Math.abs(yt))
    .toFixed(9);
}
