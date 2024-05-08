import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useMintToUser} from '@rx/web3/hooks/use-mint-to-user';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function MintToUser() {
  const [marginIndex, setMarginIndex] = useState(18);
  const [amount, setAmount] = useState(100);
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit, client} = useMintToUser({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    submit({marginIndex: Number(marginIndex), amount: Number(amount)}).then();
  }, [connected, amount, marginIndex, client]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="flex flex-row items-center gap-12px w-full">
        <label htmlFor="marginIndex" className="font-medium text-white">
          MarginIndex
        </label>
        <input
          type="number"
          name="marginIndex"
          className="flex-1 block w-full text-right rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
          spellCheck={false}
          placeholder="Margin Index : 18 || 19"
          onChange={(ev) => setMarginIndex(Number(ev.target.value))}
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
          onChange={(ev) => setAmount(Number(ev.target.value))}
        />
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" onClick={handleSubmit}>
          Mint To User
        </Button>
      </div>
    </StyledWrap>
  );
}
