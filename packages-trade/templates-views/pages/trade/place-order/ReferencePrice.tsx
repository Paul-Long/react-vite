import {contract$} from '@/pages/trade/streams/streams';
import {numUtil} from '@rx/helper/num';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {referencePrice$} from '@rx/streams/market/reference-price';
import {clsx} from 'clsx';
import {useEffect, useMemo, useState} from 'react';

interface Props {
  onChange: (v: string) => void;
}

export function ReferencePrice(props: Props) {
  const {options, state, setState} = useData(props);
  return (
    <div className="group relative shrink-0">
      <div className="flex shrink-0 flex-row items-center text-gray-600 font-size-14px lh-14px gap-8px cursor-pointer flex-nowrap text-nowrap">
        {state?.label ?? ''} APY
        <i className="block iconfont font-size-12px lh-12px text-gray-600 transform-rotate-90deg group-hover:rotate-[-90deg] group-hover:mt-1px">
          &#xe63c;
        </i>
      </div>
      <div className="hidden group-hover:flex absolute right-8px top-4px pt-16px w-auto z-10 max-w-none overflow-hidden ">
        <div className="p-12px font-size-14px text-gray-600 flex flex-col gap-16px rounded-8px bg-gray-80 backdrop-blur-24px shadow-lg ring-1 ring-gray-900/5">
          {options?.map((o) => (
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
  );
}

function useData(props: Props) {
  const [contract] = useStream(contract$);
  const prices = useObservable(referencePrice$, []);
  const [state, setState] = useState<{label: string; value: string} | null>(null);

  const options = useMemo(() => {
    if (!contract || prices?.length < 1) {
      return [];
    }
    const price: any = prices.find((p) => p.token === contract);
    setState({label: '7D', value: price['7D']});
    return ['ON', '7D', '1M', '1Y'].map((k) => ({label: k, value: price[k]}));
  }, [contract, prices]);

  useEffect(() => {
    props?.onChange(state?.value ? numUtil.floor(state.value, 2, -2) + '%' : '');
  }, [state]);
  return {options, state, setState};
}
