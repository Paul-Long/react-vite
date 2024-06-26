import {contract$} from '@/streams/trade/page-state';
import {TransferIcon} from '@rx/components/icons/TransferIcon';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {referencePrice$} from '@rx/streams/market/reference-price';
import {Select} from '@rx/widgets';
import {useMemo, useState} from 'react';

export function ImpliedYieldAPY({
  fixedRate,
  direction,
}: {
  fixedRate: string;
  direction: 'LONG' | 'SHORT';
}) {
  const {LG} = useLang();
  const {options, rate, state, setState} = useData();
  return (
    <div className="w-full flex flex-col gap-8px py-12px border-b-1px border-solid border-#2C2D2D">
      <div className="flex flex-row items-center justify-between">
        <span className="font-size-12px lh-18px">{LG(lang.ImpliedYield)}</span>
        <Select
          placement="bottom"
          border={false}
          options={options}
          value={state}
          onChange={(v) => setState(v as string)}
          renderTrigger={({label}) => (
            <div className="flex flex-row flex-nowrap gap-8px text-nowrap">{label} APY</div>
          )}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-yellow-500 font-size-16px fw-medium">{fixedRate || '-'}</span>
        <div className="inline-block p-4px rounded-2px bg-#1F1F21">
          <TransferIcon />
        </div>
        <span className="text-yellow-500 font-size-16px fw-medium">{rate || '-'}</span>
      </div>
    </div>
  );
}

function useData() {
  const [contract] = useStream(contract$);
  const prices = useObservable(referencePrice$, []);
  const [state, setState] = useState<string>('7D');

  const options = useMemo(() => {
    return ['ON', '7D', '1M', '1Y'].map((k) => ({
      label: <div className="text-center">{k}</div>,
      value: k,
    }));
  }, []);

  const rate = useMemo(() => {
    const price: any = prices.find((p) => p.token === contract);
    const r = price?.[state];
    if (Number(r) >= 0) {
      return numUtil.floor(r, 2, -2) + '%';
    }
    return '-';
  }, [prices, state, contract]);

  return {options, state, setState, rate};
}
