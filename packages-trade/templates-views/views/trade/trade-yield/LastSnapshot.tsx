import {current$} from '@/streams/trade/page-state';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Tooltip} from '@rx/widgets';
import {Big} from 'big.js';
import {ReactNode} from 'react';

export function LastSnapshot() {
  const {LG} = useLang();
  const current = useObservable(current$, null);

  return (
    <div className="flex-1 grid grid-cols-auto-6">
      <Item title={LG(clang.ExpireIn)}>{[current?.ttm, current?.unit].join(' ')}</Item>
      <Item title={LG(clang.Yield)}>
        <span className="text-lime-500">
          {current?.Yield
            ? Big(current?.Yield ?? 0)
                .times(100)
                .toFixed(2) + '%'
            : '-'}
        </span>
      </Item>
      <Item title={LG(clang.Price)}>
        <span className="text-yellow-500">{(current?.LastPrice ?? '-') + ' SOL'}</span>
      </Item>
      <Item
        title={
          <Tooltip
            placement="top"
            className="max-w-300px"
            text="cumulative price accounts for both the time-decaying value of YT and the accrued ST earned from YT."
          >
            <span className="underline underline-dotted cursor-help">
              {LG(lang.CumulativePrice)}
            </span>
          </Tooltip>
        }
      >
        {(!!current?.CumulativePrice && !!current?.LastPrice
          ? numUtil.trimEnd0(
              Big(current?.LastPrice ?? 0)
                .plus(current?.CumulativePrice)
                .toFixed(9)
            )
          : '-') + ' SOL'}
      </Item>
      <Item title={LG(lang.OpenInterest)}>
        {(current?.OpenInterest
          ? numUtil.trimEnd0(numUtil.floor(current?.OpenInterest ?? 0, 2))
          : '-') + ' SOL'}
      </Item>
      <Item title={LG(lang.AvaLiquidity)}>
        {(current?.AvaLiquidity
          ? numUtil.trimEnd0(numUtil.floor(current?.AvaLiquidity ?? 0, 2))
          : '-') + ' SOL'}
      </Item>
    </div>
  );
}

function Item({title, children}: {title: ReactNode; children: ReactNode}) {
  return (
    <div className="flex-1 flex flex-row items-start gap-6px">
      <div className="w-8px h-10px inline-block rounded-2px bg-gray-20 mt-3px"></div>
      <div className="flex flex-col gap-2px">
        <div className="lh-18px fw-normal text-gray-60 text-nowrap">{title}</div>
        <div className="font-size-16px lh-24px fw-medium">{children}</div>
      </div>
    </div>
  );
}
