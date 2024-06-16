import {loginApi} from '@rx/api/login';
import {writeToken} from '@rx/helper/token';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/common.lang';
import {checkAuth} from '@rx/streams/auth';
import {walletModalVisible$} from '@rx/streams/wallet';
import {useSignIn} from '@rx/web3/hooks/use-sign-in';
import {useWallets} from '@rx/web3/hooks/use-wallets';
import {Modal, Toast} from '@rx/widgets';
import {useCallback} from 'react';

export function WalletModal() {
  const {LG} = useLang();
  const {wallets, select} = useWallets();
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
  const {onSignIn, onSignIn2} = useSignIn({onFinish: handleFinish});

  const handleSelect = useCallback(
    async (wallet: any) => {
      select(wallet.name);
      await onSignIn2(wallet);
    },
    [select]
  );

  return (
    <Modal
      title={LG(lang.ConnectWallet)}
      visible={visible}
      size="small"
      onClose={() => setVisible(false)}
    >
      <div className="w-full flex flex-col">
        {wallets.map(({adapter}) => (
          <div
            key={adapter.name}
            className="flex flex-row items-center min-w-524px p-20px rounded-8px hover:bg-green-80 gap-12px cursor-pointer"
            onClick={() => handleSelect(adapter)}
          >
            <img src={adapter.icon} width={48} height={48} />
            <div className="font-size-18px lh-22px fw-semibold">{adapter.name}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
