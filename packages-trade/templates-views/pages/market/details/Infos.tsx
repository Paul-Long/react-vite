import {ASSETS_IMAGES} from '@rx/const/images';
import {numUtil} from '@rx/helper/num';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/dashboard.lang';
import {referencePrice$} from '@rx/streams/market/reference-price';
import {lastTradeSnapshot$} from '@rx/streams/subscription/last-trade-snapshot';
import {Button} from '@rx/widgets';
import {useCallback, useEffect, useMemo} from 'react';
import {detail$} from '../streams';
import {IMAGES} from '@/pages/lp/const';

export function Infos() {
  const {fixLink} = useFixLink();
  const reference = useObservable(referencePrice$, []);
  const [detail, setDetail] = useStream(detail$);
  const {LG} = useLang();

  useEffect(() => {
    if (detail) {
      lastTradeSnapshot$.next('dc.md.trade.' + detail.symbol);
    }
  }, [detail]);

  const refer = useMemo<any>(() => {
    return reference?.find((r) => r.token === detail?.symbolLevel2Category) ?? {};
  }, [detail, reference]);

  const handleBack = useCallback(() => setDetail(null), []);

  const gotoTrade = useCallback(
    (event: any) => {
      event.stopPropagation();
      window.location.assign(fixLink('/trade') + '/' + detail.SecurityID);
    },
    [detail]
  );

  return (
    <div className="flex flex-col mt-50px gap-64px">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-36px">
          <div className="flex flex-row items-center flex-nowrap font-size-32px font-semibold gap-24px">
            <div
              className="flex justify-center items-center w-32px h-32px bg-gray-80 rounded-4px ml-[-56px] cursor-pointer"
              onClick={handleBack}
            >
              <i className="iconfont font-size-12px lh-12px transform-rotate-180deg">&#xe63c;</i>
            </div>
            <img src={IMAGES[detail.symbolLevel2Category?.toUpperCase()]} alt="" width={28} height={28} />
            {detail?.symbolName}
          </div>
          <div className="flex flex-row items-center font-size-14px lh-20px gap-42px">
            <span className="text-gray-600">{LG(lang.ReferenceRate)}</span>
            <span className="text-gray-600">{detail?.symbolLevel2Category}</span>
            <div className="flex flex-row items-center gap-12px">
              <span className="text-gray-600">O/N</span>
              <span className="text-green-500 font-semibold">{numToPercentage(refer?.ON)}</span>
            </div>
            <div className="flex flex-row items-center gap-12px">
              <span className="text-gray-600">7D</span>
              <span className="text-green-500 font-semibold">{numToPercentage(refer?.['7D'])}</span>
            </div>
            <div className="flex flex-row items-center gap-12px">
              <span className="text-gray-600">1M</span>
              <span className="text-green-500 font-semibold">{numToPercentage(refer?.['1M'])}</span>
            </div>
            <div className="flex flex-row items-center gap-12px">
              <span className="text-gray-600">1Y</span>
              <span className="text-green-500 font-semibold">{numToPercentage(refer?.['1Y'])}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-18px">
          <Button size="sm" type="primary" onClick={gotoTrade}>
            {LG(lang.Trade)}
          </Button>
          {/*<Button type="aqua">{LG(lang.Earn)}</Button>*/}
        </div>
      </div>

      <div className="grid grid-cols-5 font-semibold">
        <div className="flex flex-col">
          <div className="inline-flex flex-col gap-16px">
            <div className="text-gray-400">{LG(lang.UnderlyingYield)}</div>
            <div className="font-size-24px lh-36px">{detail?.symbolLevel2Category}</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-16px">
          <span className="text-gray-400">{LG(lang.Maturity)}</span>
          <span className="font-size-24px lh-36px">
            {detail?.dueDate?.slice(0, 11)?.replace(/-/g, '/')}
          </span>
        </div>
        <div className="flex flex-col items-center gap-16px">
          <span className="text-gray-400">{LG(lang.ExpireIn)}</span>
          <span className="font-size-24px lh-36px">{detail?.ttm}</span>
        </div>
        <div className="flex flex-col items-center gap-16px">
          <span className="text-gray-400">{LG(lang.ImpliedYield)}</span>
          <span className="font-size-24px lh-36px text-green-500">{detail?.impliedYield}</span>
        </div>
        {/*<div className="flex flex-col gap-16px">*/}
        {/*  <span className="text-gray-400 text-right">{LG(lang.MarginRate)}</span>*/}
        {/*  <span className="font-size-24px lh-36px text-green-500 text-right">+7%</span>*/}
        {/*</div>*/}
      </div>
      <div className="grid grid-cols-5 font-semibold">
        <div className="flex flex-col">
          <div className="inline-flex flex-col gap-16px">
            <span className="text-gray-400">{detail?.symbolName} price</span>
            <span className="font-size-24px lh-36px text-yellow">{detail?.LastPrice ?? '-'}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-16px ">
          <span className="text-gray-400">{LG(lang.OpenInterest)}</span>
          <span className="font-size-24px lh-36px">
            {numUtil.trimEnd0(detail?.OpenInterest ?? '')} SOL
          </span>
        </div>
        <div className="flex flex-col items-center gap-16px">
          <span className="text-gray-400">{LG(lang.AvaLiquidity)}</span>
          <span className="font-size-24px lh-36px">
            {numUtil.floor(detail?.AvaLiquidity || 0, 2)} SOL
          </span>
        </div>
      </div>
    </div>
  );
}

function numToPercentage(nm: string) {
  if (!nm) {
    return '-';
  }
  return numUtil.floor(nm, 2, -2) + '%';
}
