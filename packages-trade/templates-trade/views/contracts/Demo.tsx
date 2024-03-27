import {ConnectButton} from '@rx/web3';
import {useOrderPlace} from '@rx/web3/hooks/use-order-place';
import {Button} from '@rx/widgets';
import {loginApi} from '@trade/api/login';
import {useCallback, useState} from 'react';

export function Demo() {
  const {program, publicKey, connection, submit} = useOrderPlace();
  const [tx, setTx] = useState<string>('');

  const handleSubmit = useCallback(async () => {
    const TX = await submit();
    setTx(TX);
  }, [program, publicKey, connection]);

  const handleLogin = useCallback((params: SignResult) => {
    loginApi.login(params);
  }, []);
  return (
    <div className="df fdc jcc w100%">
      <div className="df fdc aic max-w500 gap32px">
        <div className="df fdr jcfe">
          <div className="max-w200px">
            <ConnectButton onLogin={handleLogin} />
          </div>
        </div>
        <div className="w200px">
          <Button onClick={handleSubmit}>Place Order</Button>
        </div>
        <p>TX: {tx}</p>
      </div>
    </div>
  );
}
