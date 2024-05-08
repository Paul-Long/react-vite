import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {useConnect} from '@rx/web3/hooks/use-connect.ts';
import {useMintBalance} from '@rx/web3/hooks/use-mint-balance.ts';
import {useEffect} from 'react';
import {InputNumber} from './InputNumber';

interface Props {
  value?: string | number;
  onChange?: (v: string | number) => void;
}

export function DepositMargin(props: Props) {
  const {LG} = useLang();
  const {connected} = useConnect();
  const {query, balance, client} = useMintBalance();
  useEffect(() => {
    setInterval(async () => {
      await query();
    }, 15000);
  }, [connected, client]);
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row items-center justify-between text-gray-600">
        <span>{LG(lang.DepositMargin)}</span>
        <span className="font-size-14px">
          {LG(clang.Balance)} : {balance}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <InputNumber value={props.value} onChange={props.onChange} />
        <div className="text-gray-600">SOL</div>
      </div>
    </div>
  );
}
