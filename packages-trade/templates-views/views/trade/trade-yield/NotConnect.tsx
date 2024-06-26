import {NoConnectIcon} from '@rx/components/icons/NoConnectIcon';
import {ConnectButton} from '@rx/components/wallet';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/trade.lang';
import {isLogin$} from '@rx/streams/auth';
import {useConnect} from '@rx/web3/hooks/use-connect';

export function NotConnect() {
  const {LG} = useLang();
  const isLogin = useObservable<boolean>(isLogin$, false);
  const {address} = useConnect();
  if (!!address && isLogin) {
    return <></>;
  }
  return (
    <div className="w-460px max-w-full flex flex-col items-center mx-auto gap-12px">
      <div className="w-100px h-100px flex items-center justify-center">
        <NoConnectIcon width={64} height={64} />
      </div>
      <div className="text-center text-wrap text-gray-60 lh-18px">{LG(lang.NotConnectDesc)}</div>
      <ConnectButton />
    </div>
  );
}
