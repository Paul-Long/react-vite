import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/dashboard.lang';
import {referencePrice$} from '@rx/streams/market/reference-price';
import {useMemo} from 'react';

export function Reference({symbol}: {symbol: string}) {
  const reference = useObservable(referencePrice$, []);
  const {LG} = useLang();
  const refer = useMemo<any>(() => {
    return reference?.find((r) => r.token === symbol) ?? {};
  }, [symbol, reference]);
  return (
    <div className="flex flex-row items-center font-size-14px lh-20px gap-42px">
      <span className="text-gray-600">{LG(lang.ReferenceRate)}</span>
      <span className="text-gray-600">SOL</span>
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
  );
}

function numToPercentage(nm: string) {
  if (!nm) {
    return '-';
  }
  return numUtil.floor(nm, 2, -2) + '%';
}
