import {loginApi} from '@rx/api/login';
import {IMAGES} from '@rx/const/images';
import {removeToken, writeToken} from '@rx/helper/token';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang as clang} from '@rx/lang/common.lang';
import {checkAuth, isLogin$} from '@rx/streams/auth';
import {user$} from '@rx/streams/user';
import {StyledWalletConnected} from '@rx/web3/components/styles';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useSignIn} from '@rx/web3/hooks/use-sign-in';
import {abbreviateString} from '@rx/web3/utils/string';
import {Button, Dropdown, Toast} from '@rx/widgets';
import {useCallback} from 'react';

export function ConnectButton() {
  const {LG} = useLang();
  const {disconnect} = useConnect();
  const isLogin = useObservable<boolean>(isLogin$, false);
  const user = useObservable<User | null>(user$, null);

  const handleFinish = useCallback(async (params: SignResult) => {
    const {data} = await loginApi.login(params);
    if (data) {
      writeToken(data.token);
      Toast.success('Login Success');
      await Promise.all([checkAuth()]);
    }
  }, []);
  const {onSignIn} = useSignIn({onFinish: handleFinish});

  const handleLogout = useCallback(async () => {
    removeToken();
    await disconnect();
    window.location.reload();
  }, []);

  if (isLogin) {
    return (
      <Dropdown
        contentStyle={{background: '#0A253D'}}
        content={
          <Button style={{width: '100%'}} onClick={handleLogout}>
            {LG(clang.Disconnect)}
          </Button>
        }
      >
        <StyledWalletConnected className="dif fdr aic gap10px border-rd-4px fw700 cp">
          <img className="dib" src={IMAGES.sol} alt="sol" />
          <span className="T3">{abbreviateString(user?.name as string)}</span>
          <i className="iconfont T3">&#xe624;</i>
        </StyledWalletConnected>
      </Dropdown>
    );
  }
  return (
    <Button className="min-w160px font-size-18px" onClick={onSignIn}>
      {LG(clang.Connect)}
    </Button>
  );
}
