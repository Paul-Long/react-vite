import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useFillOrder} from '@rx/web3/hooks/use-fill-order';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function PerpFillOrder() {
  const [value, setValue] = useState(1);
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit} = useFillOrder({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    submit(value).then();
  }, [connected, value]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>

      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="orderID" className="font-medium text-white">
          Order ID :
        </label>
        <input
          type="text"
          name="orderID"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="Order ID"
          onChange={(ev) => setValue(Number(ev.target.value))}
        />
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" onClick={handleSubmit}>
          Fill Order By ID
        </Button>
      </div>
    </StyledWrap>
  );
}
