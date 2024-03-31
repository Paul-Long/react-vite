import {StyledWrap} from '@/views/contracts/styles';
import {useDeposit} from '@rx/web3/hooks/use-deposit';
import {Button} from '@rx/widgets';
import {useState} from 'react';

export function Deposit() {
  const [tx, setTx] = useState<string>('');
  const {submit} = useDeposit({
    onFinish(t: string) {
      setTx(t);
    },
  });

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="df jcfe">
        <Button className="font-size-16px" width={120} onClick={submit}>
          Deposit
        </Button>
      </div>
    </StyledWrap>
  );
}
