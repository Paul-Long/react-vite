import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/common.lang';
import type {DepositParams} from '@rx/streams/wallet';
import {depositModal$} from '@rx/streams/wallet';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Modal, Toast} from '@rx/widgets';
import {useCallback, useRef} from 'react';
import {styled} from 'styled-components';
import {DownIcon} from '../icons/DownIcon';

const StyleInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
`;

export function DepositModal() {
  const {LG} = useLang();
  const inputRef = useRef<HTMLInputElement>(null);
  const [client] = useStream(rateXClient$);
  const [state, setState] = useStream<DepositParams>(depositModal$);

  const handleConfirm = useCallback(async () => {
    const amount = inputRef.current?.value;
    if (!amount || Number(amount) <= 0 || !client || !state.userPda) {
      return;
    }
    const tx = await client?.deposit(state.userPda, {
      marketIndex: state.marketIndex,
      marginIndex: state.marginIndex,
      amount,
    });
    if (tx) {
      Toast.success('Deposit success');
      state?.onFinish?.();
      setState({visible: false});
    }
  }, [client, state]);
  return (
    <Modal
      title={
        <div className="flex flex-row items-center gap-8px">
          <div className="flex justify-center items-center rounded-2px w-24px h-24px cursor-pointer border-1px border-solid border-lime-500">
            <DownIcon color="#8DCC2F" />
          </div>
          {LG(lang.Deposit)}
        </div>
      }
      visible={state.visible}
      size="small"
      onClose={() => setState({visible: false})}
    >
      <div className="flex flex-col gap-32px p-24px w-480px box-border">
        <StyleInput
          ref={inputRef}
          type="number"
          placeholder="0.00"
          className="text-green-500 px-10px py-8px bg-transparent outline-none b-1px rounded-4px b-gray-40 text-right"
        />
        <Button className="flex-1" size="md" type="lime" onClick={handleConfirm}>
          {LG(lang.Confirm)}
        </Button>
      </div>
    </Modal>
  );
}
