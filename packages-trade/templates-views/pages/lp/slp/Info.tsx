import {apy$} from '@/streams/lp/apy';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Tooltip} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useEffect, useMemo, useState} from 'react';

interface Props {
  contract: any;
}

export function Info(props: Props) {
  const {contract} = props;
  const {LG} = useLang();
  const apyList = useObservable(apy$, []);
  const last = useObservable<Record<string, any>>(lastTrade$, {});
  const [term, setTerm] = useState('7D');

  const trade = useMemo(() => last?.[contract?.symbol], [contract, last]);

  const data = useMemo(() => {
    return apyList?.find((a: any) => a.symbol === contract?.symbol && a.term === term);
  }, [contract, apyList, term]);

  const ar = useMemo(() => {
    if (!trade || !contract) {
      return '-';
    }
    return (
      Big(trade.LastPrice ?? '0')
        .times(contract.kValue)
        .times(100)
        .round(2, 3)
        .toString() + '%'
    );
  }, [trade, contract]);

  const apr = useMemo(() => {
    if (!data?.apr) {
      return '-';
    }
    return Big(data.apr).times(100).toFixed(4);
  }, [data]);

  return (
    <div className="grid grid-cols-3 p-24px gap-32px rounded-8px bg-gray-40">
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Pool)}</div>
        <div className="text-white font-size-18px">{props.contract?.symbol ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Maturity)}</div>
        <div className="text-white font-size-18px">{props.contract?.dueDate ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.ExpireIn)}</div>
        <div className="text-white font-size-18px">{props.contract?.maturityStr ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">APR {term}</div>
        <div className="text-green-500 font-size-18px">{apr}%</div>
      </div>
      <div className="flex flex-col gap-8px">
        <SelectTerm onChange={(v: any) => setTerm(v)} />
        <div className="text-#FFD166 font-size-18px">
          {numUtil.trimEnd0(numUtil.floor(data?.stVolume ?? 0, 4))} SOL
        </div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{'TVL'}</div>
        <div className="text-#FFD166 font-size-18px">
          {numUtil.trimEnd0(numUtil.floor(trade?.AvaLiquidity ?? 0, 4))} SOL
        </div>
      </div>
      <div className="flex flex-col gap-8px">
        <Tooltip
          className="min-w-200px"
          text={`Active Ratio (AR) decides how much of an LP's liquidity goes into the AMM.`}
        >
          <div className="text-gray-600 underline underline-dotted">Active Ratio</div>
        </Tooltip>
        <div className="text-green-500 font-size-18px">{ar}</div>
      </div>
    </div>
  );
}

function SelectTerm({onChange}: {onChange: (v: string) => void}) {
  const [state, setState] = useState(termOptions[1]);
  useEffect(() => {
    onChange?.(state.value);
  }, [state]);
  return (
    <div className="group relative shrink-0">
      <div className="flex shrink-0 flex-row items-center text-gray-600 font-size-14px lh-14px gap-8px cursor-pointer flex-nowrap text-nowrap">
        {state?.label ?? ''}
        <i className="block iconfont font-size-12px lh-12px text-gray-600 transform-rotate-90deg group-hover:rotate-[-90deg] group-hover:mt-1px">
          &#xe63c;
        </i>
      </div>
      <div className="hidden group-hover:flex absolute right-8px top-4px pt-16px w-auto z-10 max-w-none overflow-hidden">
        <div className="bg-black rounded-8px">
          <div className="p-12px font-size-14px text-gray-600 flex flex-col gap-16px rounded-8px bg-gray-80 backdrop-blur-24px shadow-lg ring-1 ring-gray-900/5">
            {termOptions?.map((o) => (
              <div
                key={o.label}
                onClick={() => setState(o)}
                className={clsx(
                  'flex-auto text-nowrap font-light hover:text-white cursor-pointer px-8px',
                  [state?.value === o.value && 'text-white']
                )}
              >
                {o.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const termOptions = [
  {label: '1D Volume', value: '1D'},
  {label: '7D Volume', value: '7D'},
  {label: '30D Volume', value: '30D'},
];
