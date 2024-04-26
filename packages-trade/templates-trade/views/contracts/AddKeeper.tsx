import {walletModalVisible$} from '@rx/streams/wallet';
import {useAddKeeper} from '@rx/web3/hooks/use-add-keeper';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function AddKeeper() {
  const [tx, setTx] = useState<string>('');
  const [value, setValue] = useState('');
  const {connected} = useConnect();
  const {submit} = useAddKeeper({
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
    <StyledWrap className="flex flex-col gap-24px">
      <p className="w-100% text-wrap break-words">TX: {tx}</p>
      <div className="flex flex-col gap-12px">
        <div className="w-100% flex flex-row items-center gap-12px">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Address
          </label>
          <div className="mt-2 flex-1">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none px-10px"
              spellCheck={false}
              placeholder="address"
              onChange={(ev) => setValue(ev.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="font-size-16px text-nowrap" onClick={handleSubmit}>
            Add Keeper
          </Button>
        </div>
      </div>
    </StyledWrap>
  );
}
