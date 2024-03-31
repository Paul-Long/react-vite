import {useObservable} from '@rx/hooks/use-observable';
import {isLogin$} from '@rx/streams/auth';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useEffect} from 'react';

export function AutoConnect() {
  const {connected, connect} = useConnect();
  const isLogin = useObservable<boolean>(isLogin$, false);

  useEffect(() => {
    if (isLogin && !connected) {
      connect().then();
    }
  }, [isLogin, connected]);
  return <></>;
}
