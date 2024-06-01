import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';
import {Big} from 'big.js';
import {clsx} from 'clsx';
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
          <span
            className={clsx('font-size-14px lh-24px font-medium text-nowrap', [
              o.color || 'text-white',
            ])}
          >
            {o.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const genInfo = (LG: (s: string) => string, data: any) => [
  {title: LG(lang.ExpireIn), value: data?.ttm},
  {
    title: 'Yield',
    value: data?.Yield
      ? Big(data?.Yield ?? 0)
          .times(100)
          .toFixed(2) + '%'
      : '-',
    color: 'text-green-500',
  },
  {title: 'Price', value: data?.LastPrice ?? '-', color: 'text-yellow-500'},
  {
    title: 'Cumulative Price',
    value:
      !!data?.CumulativePrice && !!data?.LastPrice
        ? numUtil.trimEnd0(
            Big(data?.LastPrice ?? 0)
              .plus(data.CumulativePrice)
              .toFixed(9)
          )
        : '-',
  },
  {
    title: 'Open Interest',
    value: data?.OpenInterest ? numUtil.trimEnd0(numUtil.floor(data?.OpenInterest ?? 0, 2)) : '-',
  },
  {
    title: 'Ava.Liquidity',
    value: data?.AvaLiquidity ? numUtil.trimEnd0(numUtil.floor(data?.AvaLiquidity ?? 0, 2)) : '-',
  },
];
