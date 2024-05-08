import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {ttmMap$} from '@rx/streams/epoch';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect.ts';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useContract} from '../hooks/use-contract';

export function useForm() {
  const current = useRef<string>('amount');
  const timer = useRef<any>(null);
  const ttmMap = useObservable<Record<string, any>>(ttmMap$, {});
  const [client] = useStream(rateXClient$);
  const {baseContract} = useContract();
  const [info, setInfo] = useState<any>({});
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
    genSwap(1);
  }, [baseContract, client]);

  const handleChange = useCallback(
    (key: string) => {
      return (v: string | number) => {
        setState((prevState) => {
          const newState = {...prevState, [key]: v};
          if (key === 'amount' && !!v && prevState.leverage > 0) {
            current.current = key;
            newState.margin = Big(v).div(prevState.leverage).round(4, 3).toNumber();
          }
          if (key === 'margin' && !!v && prevState.leverage > 0) {
            current.current = key;
            newState.amount = Big(v).times(prevState.leverage).round(4, 0).toNumber();
          }
          if (key === 'leverage') {
            if (current.current === 'amount') {
              newState.margin = Big(prevState.amount).div(v).round(4, 3).toNumber();
            }
            if (current.current === 'margin') {
              newState.amount = Big(prevState.margin).times(v).round(4, 0).toNumber();
            }
          }
          if (['amount', 'margin'].includes(key)) {
            genSwap(newState.amount);
            setInfo((prevState: any) => {
              const fee = Big(newState.amount).times(0.005).toFixed(4);
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
    (amount: number) => {
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
          amount,
          direction: state.direction,
          marketIndex,
          days: ttmMap?.[key]?.days,
        });
        setInfo((prevState: any) => ({...prevState, ...(res ?? {})}));
        console.log('Simulate Place Order : result ', res);

        clearTimeout(timer.current);
        timer.current = null;
      }, 1000);
    },
    [state, baseContract, client, ttmMap]
  );

  const handleSubmit = useCallback(async () => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (!baseContract) {
      return;
    }
    const {margin, marginType, direction, amount} = state;
    const order = {
      marginType,
      direction,
      amount,
      marketIndex: baseContract.id,
      orderType: 'MARKET',
      margin,
    };
    const tx = await client.placeOrder2(order);
    if (tx === false) {
      Toast.warn('Order placement failed, please check current positions and orders.');
      return;
    }
    Toast.success('Place Order success');
  }, [connected, state, baseContract, client]);

  return {state, info, handleChange, handleSubmit};
}
