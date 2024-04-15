import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useOrderPlace} from '@rx/web3/hooks/use-order-place';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function PerpPlaceOrder() {
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit} = useOrderPlace({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    submit().then();
  }, [connected]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="df jcfe">
        <Button className="font-size-16px text-nowrap" width="auto" onClick={handleSubmit}>
          Place Order
        </Button>
      </div>
    </StyledWrap>
  );
}
