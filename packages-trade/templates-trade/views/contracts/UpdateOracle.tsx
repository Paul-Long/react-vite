import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useUpdateOracle} from '@rx/web3/hooks/use-update-oracle';
import {Button, Toast} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function UpdateOracle() {
  const [marketRate, setMarketRate] = useState(1);
  const [rate, setRate] = useState(1);
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit} = useUpdateOracle({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (marketRate <= 0 || rate <= 0) {
      Toast.warn('Please input rate');
      return;
    }
    submit(Number(marketRate), Number(rate)).then();
  }, [connected, marketRate, rate]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="flex flex-col gap12px">
        <div className="flex flex-row items-center gap-12px w-full">
          <label htmlFor="amount" className="font-medium text-white">
            Market Rate :
          </label>
          <input
            type="number"
            name="amount"
            className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
            spellCheck={false}
            placeholder="Amount"
            onChange={(ev) => setMarketRate(Number(ev.target.value))}
          />
        </div>
        <div className="flex flex-row items-center gap-12px w-full">
          <label htmlFor="amount" className="font-medium text-white">
            Rate :
          </label>
          <input
            type="number"
            name="amount"
            className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
            spellCheck={false}
            placeholder="Amount"
            onChange={(ev) => setRate(Number(ev.target.value))}
          />
        </div>
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" onClick={handleSubmit}>
          Update Oracle
        </Button>
      </div>
    </StyledWrap>
  );
}
