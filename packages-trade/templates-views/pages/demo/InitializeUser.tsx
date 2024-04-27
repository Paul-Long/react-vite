import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useInitializeUser} from '@rx/web3/hooks/use-initialize-user';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function InitializeUser() {
  const [tx, setTx] = useState<string>('');
  const [isIsolated, setIsolated] = useState(false);
  const [isTrader, setTrader] = useState(false);
  const {connected} = useConnect();
  const {submit, query} = useInitializeUser({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const queryInfo = useCallback(async () => {
    const info = await query();
    console.log('User Info : ', info);
  }, [connected]);

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    submit(isIsolated, isTrader).then();
  }, [connected, isIsolated, isTrader]);

  return (
    <StyledWrap className="flex flex-col gap-24px">
      <p className="w-100% text-wrap break-words">TX: {tx}</p>
      <div></div>
      <div className="flex flex-col gap-12px">
        <div className="flex flex-row items-center gap-24px">
          <div className="flex h-6 items-center gap-8px">
            <input
              id="isolated"
              aria-describedby="offers-description"
              name="isolated"
              type="checkbox"
              onChange={(ev) => setIsolated(ev.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500 "
            />
            <label htmlFor="isolated" className="font-medium text-white">
              Is Isolated
            </label>
          </div>
          <div className="flex h-6 items-center gap-8px">
            <input
              id="trader"
              aria-describedby="offers-description"
              name="trader"
              type="checkbox"
              onChange={(ev) => setTrader(ev.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="trader" className="font-medium text-white">
              Is Trader
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-24px">
          <Button className="font-size-16px text-nowrap" onClick={queryInfo}>
            Query User
          </Button>
          <Button className="font-size-16px text-nowrap" onClick={handleSubmit}>
            Initialize User
          </Button>
        </div>
      </div>
    </StyledWrap>
  );
}
