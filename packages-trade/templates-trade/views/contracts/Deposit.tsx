import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useDeposit} from '@rx/web3/hooks/use-deposit';
import {Button, NumberInput, Toast} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function Deposit() {
  const [value, setValue] = useState(1);
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit} = useDeposit({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (value <= 0) {
      Toast.warn('Please input Trade Price');
      return;
    }
    submit(Number(value)).then();
  }, [connected, value]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="df fdr aic gap12px">
        <div>Amount : </div>
        <NumberInput
          className="flex-1"
          value={value}
          precision={4}
          onChange={(v: number) => setValue(v)}
          style={{paddingLeft: 10, paddingRight: 10, fontSize: 16, fontWeight: 500}}
        />
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" width="auto" onClick={handleSubmit}>
          Deposit
        </Button>
      </div>
    </StyledWrap>
  );
}
