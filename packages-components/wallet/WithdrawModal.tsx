import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/common.lang';
import type {WithdrawParams} from '@rx/streams/wallet';
import {withdrawModal$} from '@rx/streams/wallet';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Modal, Toast} from '@rx/widgets';
import {clsx} from 'clsx';
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

export function WithdrawModal() {
  const {LG} = useLang();
  const inputRef = useRef<HTMLInputElement>(null);
  const [client] = useStream(rateXClient$);
  const [state, setState] = useStream<WithdrawParams>(withdrawModal$);

  const handleConfirm = useCallback(async () => {
    const amount = inputRef.current?.value;
    if (!amount || Number(amount) <= 0 || !client || !state.userPda) {
      return;
    }
    const tx = await client?.withdraw(state.userPda, {marginIndex: 0, amount});
    if (tx) {
      Toast.success('Withdraw success');
      state?.onFinish?.();
      setState({visible: false});
    }
  }, [client, state]);
  return (
    <Modal
      title={
        <div className="flex flex-row items-center gap-8px">
          <div
            className={clsx(
              'flex justify-center items-center rounded-2px w-24px h-24px rotate-180 cursor-pointer border-1px border-solid border-#2C2D2D'
            )}
          >
            <DownIcon color="#F6F7F3" />
          </div>
          {LG(lang.Withdraw)}
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
