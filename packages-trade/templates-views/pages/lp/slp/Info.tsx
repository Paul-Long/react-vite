import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {useMemo} from 'react';

interface Props {
  contract: any;
}

export function Info(props: Props) {
  const {contract} = props;
  const {LG} = useLang();
  const last = useObservable<Record<string, any>>(lastTrade$, {});
  const trade = useMemo(() => last?.[contract?.symbol], [contract, last]);
  const ar = useMemo(() => {
    if (!trade || !contract) {
      return '-';
    }
    return Big(trade.LastPrice).times(contract.kValue).times(100).round(2, 3).toString() + '%';
  }, [trade, contract]);
  return (
    <div className="grid grid-cols-3 p-24px gap-32px rounded-8px bg-gray-40">
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Pool)}</div>
        <div className="text-white">{props.contract?.symbol ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Maturity)}</div>
        <div className="text-white">{props.contract?.dueDate ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.ExpireIn)}</div>
        <div className="text-white">{props.contract?.maturityStr ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">APR 7D</div>
        <div className="text-green-500 font-size-18px">25%</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{'7d Volume'}</div>
        <div className="text-#FFD166 font-size-18px">1.03SOL</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{'TVL'}</div>
        <div className="text-#FFD166 font-size-18px">
          {numUtil.trimEnd0(numUtil.floor(trade?.AvaLiquidity ?? 0, 4))} SOL
        </div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">Active Ratio</div>
        <div className="text-green-500 font-size-18px">{ar}</div>
      </div>
    </div>
  );
}
