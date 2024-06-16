import {loginApi} from '@rx/api/login';
import {writeToken} from '@rx/helper/token';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/common.lang';
import {checkAuth} from '@rx/streams/auth';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useSignIn} from '@rx/web3/hooks/use-sign-in';
import {useWallets} from '@rx/web3/hooks/use-wallets';
import {Button, Modal, Toast} from '@rx/widgets';
import {useCallback} from 'react';

export function WalletModal() {
  const {LG} = useLang();
  const {wallets} = useWallets();
  const [visible, setVisible] = useStream<boolean>(walletModalVisible$);

  const handleFinish = useCallback(async (params: SignResult) => {
    const {data} = await loginApi.login(params);
    if (data) {
      writeToken(data.token);
      Toast.success('Login Success');
      await Promise.all([checkAuth()]);
      setVisible(false);
    }
  }, []);
  const {onSignIn} = useSignIn({onFinish: handleFinish});

  return (
    <Modal
      title={LG(lang.ConnectWallet)}
      visible={visible}
      size="small"
      onClose={() => setVisible(false)}
    >
      <div className="w100% mt48px">
        {wallets.map((w: Record<string, any>) => (
          <div key={w.name}>{w.name}</div>
        ))}
        <Button style={{width: '100%'}} onClick={onSignIn}>
          {LG(lang.PleaseConnectWallet)}
        </Button>
      </div>
    </Modal>
  );
}
