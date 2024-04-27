import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {InputNumber} from './InputNumber';

export function DepositMargin() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row items-center justify-between text-gray-400">
        <span>{LG(lang.DepositMargin)}</span>
        <span className="font-size-12px">{LG(clang.Balance)} : 10</span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <InputNumber />
        <div className="text-gray-400">SOL</div>
      </div>
    </div>
  );
}
