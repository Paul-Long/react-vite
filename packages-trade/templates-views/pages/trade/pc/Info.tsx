import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {Big} from 'big.js';
import {useContractInfo} from '../hooks/use-contract-info';

export function Info() {
  const {LG} = useLang();
  const {data} = useContractInfo();
  return (
    <div className="flex-1 flex flex-row items-center gap-24px">
      {genInfo(LG as any, data).map((o) => (
        <div
          key={o.title}
          className="flex-1 flex flex-col b-solid b-gray-80 not-last:b-r-1px not-last:pr-24px"
        >
          <span className="font-size-14px lh-20px font-normal text-gray-600 text-nowrap">
            {o.title}
          </span>
          <span className="font-size-14px lh-24px font-medium text-white text-nowrap">
            {o.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const genInfo = (LG: (s: string) => string, data: any) => [
  {title: 'TTM', value: data?.ttm},
  {
    title: 'Yield',
    value: data?.Yield
      ? Big(data?.Yield ?? 0)
          .times(100)
          .toFixed(2) + '%'
      : '-',
  },
  {title: 'Price', value: data?.LastPrice ?? '-'},
  {
    title: 'Cumulative Price',
    value: data?.CumulativePrice
      ? numUtil.trimEnd0(
          Big(data?.MarkPrice ?? 0)
            .plus(data.CumulativePrice)
            .toFixed(8)
        )
      : '-',
  },
  {title: 'OpenInterest', value: data?.OpenInterest ?? '-'},
  {title: 'Ava.Liquidity', value: '-'},
];
