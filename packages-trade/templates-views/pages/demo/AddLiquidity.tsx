import {walletModalVisible$} from '@rx/streams/wallet';
import {useAddLiquidity} from '@rx/web3/hooks/use-add-liquidity';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {Button, Toast} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function AddLiquidity() {
  const [state, setState] = useState({tickLowerIndex: 0, tickUpperIndex: 0, liquidityAmount: 0});
  const [index, setIndex] = useState();
  const [tx, setTx] = useState<any>('');
  const {connected} = useConnect();
  const {submit, queryIndex} = useAddLiquidity({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const query = useCallback(async () => {
    const i = await queryIndex();
    setIndex(i);
  }, [connected]);

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (!state.tickLowerIndex) {
      Toast.warn('Please input TickLowerIndex');
      return;
    }
    if (!state.tickUpperIndex) {
      Toast.warn('Please input TickUpperIndex');
      return;
    }
    if (!state.liquidityAmount) {
      Toast.warn('Please input LiquidityAmount');
      return;
    }
    submit(state.tickLowerIndex, state.tickUpperIndex, state.liquidityAmount).then();
  }, [connected, state]);

  return (
    <StyledWrap className="flex flex-col gap-24px">
      <p className="w-100% text-wrap break-words">Add TX: {tx ?? '-'}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">Current Index: {index}</div>
        <Button type="primary" onClick={() => query()}>
          Query
        </Button>
      </div>
      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="TickLowerIndex" className="font-medium text-white">
          TickLowerIndex :
        </label>
        <input
          type="number"
          name="TickLowerIndex"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="TickLowerIndex"
          onChange={(ev) =>
            setState((prevState) => ({...prevState, tickLowerIndex: Number(ev.target.value)}))
          }
        />
      </div>
      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="TickUpperIndex" className="font-medium text-white">
          TickUpperIndex :
        </label>
        <input
          type="number"
          name="TickUpperIndex"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="TickUpperIndex"
          onChange={(ev) =>
            setState((prevState) => ({...prevState, tickUpperIndex: Number(ev.target.value)}))
          }
        />
      </div>
      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="LiquidityAmount" className="font-medium text-white">
          LiquidityAmount :
        </label>
        <input
          type="number"
          name="LiquidityAmount"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="LiquidityAmount"
          onChange={(ev) =>
            setState((prevState) => ({...prevState, liquidityAmount: Number(ev.target.value)}))
          }
        />
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" onClick={handleSubmit}>
          Add Liquidity
        </Button>
      </div>
    </StyledWrap>
  );
}
