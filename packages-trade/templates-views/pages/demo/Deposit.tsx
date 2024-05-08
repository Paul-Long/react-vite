import {useStream} from '@rx/hooks/use-stream.ts';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {rateXClient$} from '@rx/web3/streams/rate-x-client.ts';
import {Button, Toast} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function Deposit() {
  const [userPda, setUserPda] = useState<string>('');
  const [value, setValue] = useState(1);
  const [client] = useStream(rateXClient$);
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();

  const handleSubmit = useCallback(async () => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (value <= 0) {
      Toast.warn('Please input Trade Price');
      return;
    }
    const tx = await client.deposit(userPda, {marginIndex: 1, amount: Number(value)});
    setTx(tx);
  }, [connected, userPda, value, client]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="userPda" className="font-medium text-white">
          UserPda
        </label>
        <input
          type="text"
          name="userPda"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="userPda"
          onChange={(ev) => setUserPda(ev.target.value)}
        />
      </div>
      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="amount" className="font-medium text-white">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="Amount"
          onChange={(ev) => setValue(Number(ev.target.value))}
        />
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" onClick={handleSubmit}>
          Deposit
        </Button>
      </div>
    </StyledWrap>
  );
}
