import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useInitializeUserStats} from '@rx/web3/hooks/use-initialize-user-stat';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function InitializeUserStats() {
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit} = useInitializeUserStats({
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
        <Button className="font-size-16px text-nowrap" onClick={handleSubmit}>
          Initialize User Stats
        </Button>
      </div>
    </StyledWrap>
  );
}
