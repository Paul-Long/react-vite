import {ConnectButton} from '@rx/components/wallet';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {isLogin$} from '@rx/streams/auth';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {Button, Tabs} from '@rx/widgets';
import {clsx} from 'clsx';
import {useState} from 'react';
import {History} from './History';
import {Orders} from './Orders';
import {Position} from './Position';

export function Positions() {
  const {LG} = useLang();
  const [select, setSelect] = useState<'CROSS' | 'ISOLATED'>('CROSS');
  const [tab, setTab] = useState<string>('position');
  const isLogin = useObservable<boolean>(isLogin$, false);
  const {connected} = useConnect();
  return (
    <div className="flex flex-col b-solid b-gray-40 b-t-1px box-border px-16px py-16px pt-0 gap-12px">
      <div className="w-300px">
        <Tabs
          size="sm"
          className="h-40px"
          defaultValue="market"
          options={genTabs(LG)}
          value={tab}
          onChange={(value) => setTab(value)}
        />
      </div>
      {tab === 'position' && (
        <div className="flex flex-row items-center gap-8px">
          <Button
            size="sm"
            className={clsx([select === 'CROSS' && 'text-gray-600'])}
            type="default"
            onClick={() => setSelect('CROSS')}
            selected={select === 'CROSS'}
          >
            <span className={clsx([select !== 'CROSS' && 'text-gray-600'])}>{LG(lang.Cross)}</span>
          </Button>
          <Button
            size="sm"
            className={clsx([select === 'ISOLATED' && 'text-gray-600'])}
            type="default"
            onClick={() => setSelect('ISOLATED')}
            selected={select === 'ISOLATED'}
          >
            <span className={clsx([select !== 'ISOLATED' && 'text-gray-600'])}>
              {LG(lang.Isolated)}
            </span>
          </Button>
        </div>
      )}
      <div className="flex overflow-hidden max-h-800px">
        {tab === 'position' && <Position marginType={select} />}
        {tab === 'orders' && <Orders />}
        {tab === 'history' && <History />}
      </div>
      <div
        className={clsx('flex-col justify-center items-center', [
          isLogin && connected ? 'hidden' : 'flex',
        ])}
      >
        <img src="https://static.rate-x.io/img/v1/0e81de/no-connect.svg" width={64} height={64} />
        <div className="text-gray-600 mt-8px mb-24px">{LG(clang.NoConnectWallet)}</div>
        <ConnectButton />
      </div>
    </div>
  );
}

const genTabs = (LG: any) => [
  {text: LG(clang.Position), value: 'position'},
  {text: LG(clang.Orders), value: 'orders'},
  {text: LG(clang.History), value: 'history'},
];
