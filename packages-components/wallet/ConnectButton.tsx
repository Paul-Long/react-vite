import {loginApi} from '@rx/api/login';
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
import {LeftArrowIcon} from '../icons/LeftArrowIcon';

export function ConnectButton() {
  const {LG} = useLang();
  const {disconnect, address, connected} = useConnect();
  const isLogin = useObservable<boolean>(isLogin$, false);
  const user = useObservable<User | null>(user$, null);

  const handleFinish = useCallback(async (params: SignResult) => {
    const {data} = await loginApi.login(params);
    if (data) {
      writeToken(data.token);
      Toast.success(
        <div className="flex flex-col items-start pga-4px">
          <span>Wallet Connected</span>
          <span className="text-nowrap text-gray-600">
            Connected to wallet {abbreviateString(data.name)}
          </span>
        </div>
      );
      await Promise.all([checkAuth()]);
    }
  }, []);
  const {onSignIn} = useSignIn({onFinish: handleFinish});

  const handleLogout = useCallback(async () => {
    removeToken();
    await disconnect();
    window.location.reload();
  }, []);

  if (isLogin && connected) {
    return (
      <Dropdown
        contentStyle={{background: '#2C2D2D'}}
        content={
          <Button size="sm" style={{width: '100%'}} type="default" onClick={handleLogout}>
            {LG(clang.Disconnect)}
          </Button>
        }
      >
        <StyledWalletConnected className="inline-flex flex-row items-center gap-10px rounded-4px font-medium cursor-pointer text-#F6F7F399 px-12px py-6px">
          {/*<img className="dib" src={ASSETS_IMAGES.SOL} alt="sol" />*/}
          <span className="">{address ? abbreviateString(address as string) : '***'}</span>
          <LeftArrowIcon className="transform-rotate-[-90deg]" width={16} height={16} />
        </StyledWalletConnected>
      </Dropdown>
    );
  }
  return (
    <Button size="sm" className="min-w160px font-size-18px" type="lime" onClick={onSignIn}>
      {LG(clang.Connect)}
    </Button>
  );
}
