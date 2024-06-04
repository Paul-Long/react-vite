import {removeAll$, removeInfo$} from '@/streams/lp/remove';
import {useObservable} from '@rx/hooks/use-observable';
import {ratePriceMap$} from '@rx/streams/market/rate-price';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {ReactNode, useMemo} from 'react';

interface Props {
  data: any;
  percent: string;
  contract: ConfigSymbol;
  children?: ReactNode;
}

export function RemoveInfo(props: Props) {
  const {data, percent, contract, children} = props;
  const info = useObservable<any>(removeInfo$, {});
  const all = useObservable<any>(removeAll$, {});
  const priceMap = useObservable<Record<string, any>>(ratePriceMap$, {});

  const residualValue = useMemo(() => {
    const price = priceMap?.[contract?.symbolLevel2Category];
    if (!!data?.total && !!price && !!all?.marginAmount) {
      const value = Big(data.total)
        .div(price)
        .minus(Big(all.marginAmount).abs())
        .round(6, 0)
        .toString();
      return Math.max(Number(value), 0);
    }
    return '-';
  }, [data, priceMap, contract, all]);

  const ytClose = useMemo(() => {
    if (!data || !percent) {
      return '-';
    }
    return Big(data.baseAssetAmount).times(percent).div(100).round(6, 0).toString();
  }, [data, percent]);

  const retainRatio = useMemo<{ratio: string; st: string; yt: string}>(() => {
    if (data?.ammPosition?.tokenA > 0 && data?.ammPosition?.tokenA > 0 - data?.reserveBaseAmount) {
      return {ratio: '-', yt: '-', st: '-'};
    }
    if (data && !Big(data.reserveBaseAmount).eq(0)) {
      const ratio = Big(data.baseAssetAmount).div(data.reserveBaseAmount).abs().round(2, 0);

      if (info?.amountA) {
        const yt = Big(data.baseAssetAmount).add(
          !info.atob ? info?.amountA : 0 - (info?.amountA || 0)
        );
        const rr = yt.div(data.baseAssetAmount).round(6, 3);
        const st = Big(data.reserveQuoteAmount).times(ratio).times(rr).round(6, 3);
        return {
          ratio: ratio.times(100).toString() + '%',
          yt: yt.round(4, 3).toString(),
          st: st.round(4, 3).toString(),
        };
      }

      return {ratio: ratio.times(100).toString() + '%', yt: '-', st: '-'};
    }
    return {ratio: '-', yt: '-', st: '-'};
  }, [data, info]);

  return (
    <div className="flex flex-col gap-12px mt-16px">
      <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
        <div className="text-gray-600">Max Withdrawable Value</div>
        <div
          className={clsx('font-medium flex flex-row items-center relative text-gray-600 gap-4px')}
        >
          <span className="text-white">
            {all?.marginAmount
              ? Big(all.marginAmount ?? 0)
                  .round(5, 0)
                  .abs()
                  .toString()
              : '-'}
          </span>
          {contract.symbolLevel2Category}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
        <div className="text-gray-600">YT to be closed</div>
        <div
          className={clsx('font-medium flex flex-row items-center relative text-gray-600 gap-4px')}
        >
          <span className="text-white">{ytClose}</span>
          {contract?.symbol}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
        <div className="text-gray-600">Estimated YT price</div>
        <div
          className={clsx('font-medium flex flex-row items-center relative text-gray-600 gap-4px')}
        >
          <span className="text-white">{Number(ytClose) != 0 ? info?.entryPrice ?? '-' : '-'}</span>
          ST
        </div>
      </div>
      <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
        <div className="text-gray-600">Estimated Received Value</div>
        <div
          className={clsx('font-medium flex flex-row items-center relative text-gray-600 gap-4px')}
        >
          <span className="text-white">
            {info?.marginAmount
              ? Big(info.marginAmount ?? 0)
                  .round(5, 0)
                  .abs()
                  .toString()
              : '-'}
          </span>
          {contract.symbolLevel2Category}
        </div>
      </div>
      {children}
      <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
        <div className="text-gray-600">Residual Value</div>
        <div
          className={clsx('font-medium flex flex-row items-center relative text-gray-600 gap-4px')}
        >
          <span className="text-white">{residualValue}</span>
          {contract.symbolLevel2Category}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between font-size-14px lh-20px">
        <div className="flex flex-row items-center text-gray-600 gap-8px">
          <span>Retain Ratio</span>
          <div className="bg-#FFF1EB1A rounded-20px font-size-12px fw-500 lh-16px text-center px-8px py-2px text-#FFD166">
            {retainRatio.ratio}
          </div>
        </div>
        <div
          className={clsx('font-medium flex flex-row items-center relative text-gray-600 gap-22px')}
        >
          <div className="flex flex-row items-center gap-4px">
            <span className="text-white">{retainRatio.st}</span>
            <span>ST</span>
          </div>
          <div className="flex flex-row items-center gap-4px">
            <span className="text-white">{retainRatio.yt}</span>
            <span>YT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
