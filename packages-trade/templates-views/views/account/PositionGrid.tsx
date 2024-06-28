import {LPLivePosition} from '@/views/account/LPLivePosition';
import {PositionWrap} from '@/views/trade/trade-yield/PositionWrap';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import {clsx} from 'clsx';
import {useState} from 'react';

export function PositionGrid() {
  const {LG} = useLang();
  const [account, setAccount] = useState('YieldSwapAccount');
  return (
    <>
      <div
        className={clsx(
          'w-full flex flex-row items-center font-size-16px px-20px pt-20px gap-40px',
          'border-b-1px border-solid border-#2C2D2D'
        )}
      >
        {Tabs(LG).map((tab) => (
          <a
            key={tab.value}
            onClick={() => setAccount(tab.value)}
            className={clsx(
              'h-full box-border px-3 hover:opacity-80',
              account === tab.value ? 'text-gray-500' : 'text-gray-60'
            )}
            aria-current="page"
          >
            <div
              className={clsx(
                'h-full flex flex-row items-center pb-12px border-b-2px border-b-solid',
                [account === tab.value ? 'border-lime-500 text-lime-500' : 'border-transparent']
              )}
            >
              {tab.text}
            </div>
          </a>
        ))}
      </div>
      {account === 'YieldSwapAccount' && <PositionWrap />}
      {account === 'LiquidityAccount' && <LPLivePosition />}
    </>
  );
}

export const Tabs = (LG: any) => [
  {text: LG(lang.YieldSwapAccount), value: 'YieldSwapAccount'},
  {text: LG(lang.EarnAccount), value: 'EarnAccount'},
  {text: LG(lang.LiquidityAccount), value: 'LiquidityAccount'},
];
