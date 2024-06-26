import {NoConnectIcon} from '@rx/components/icons/NoConnectIcon';
import {useObservable} from '@rx/hooks/use-observable';
import {isLogin$} from '@rx/streams/auth';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {clsx} from 'clsx';

export function NoData({className, description}: {className?: string; description: string}) {
  const isLogin = useObservable<boolean>(isLogin$, false);
  const {address} = useConnect();
  if (!address || !isLogin) {
    return <></>;
  }
  return (
    <div
      className={clsx('w-460px max-w-full flex flex-col items-center mx-auto gap-12px', className)}
    >
      <div className="w-100px h-100px flex items-center justify-center">
        <NoConnectIcon width={64} height={64} />
      </div>
      <div className="text-center text-wrap text-gray-60 lh-18px">{description}</div>
    </div>
  );
}
