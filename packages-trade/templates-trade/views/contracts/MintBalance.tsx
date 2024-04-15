import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useMintBalance} from '@rx/web3/hooks/use-mint-balance';
import {Button} from '@rx/widgets';
import {useCallback} from 'react';
import {StyledWrap} from './styles';

export function MintBalance() {
  const {connected} = useConnect();
  const {query, balance} = useMintBalance();

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    query().then();
  }, [connected]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        Balance: {balance}
      </p>
      <div className="df jcfe">
        <Button className="font-size-16px text-nowrap" width="auto" onClick={handleSubmit}>
          Query Balance
        </Button>
      </div>
    </StyledWrap>
  );
}
