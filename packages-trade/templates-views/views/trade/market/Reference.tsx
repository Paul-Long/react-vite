import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/dashboard.lang';
import {referencePrice$} from '@rx/streams/market/reference-price';
import {useMemo} from 'react';

const row = 'flex flex-row items-center fw-medium gap-4px';

export function Reference({data}: {data: ConfigSymbol}) {
  const {LG} = useLang();
  const reference = useObservable(referencePrice$, []);

  const refer = useMemo<any>(() => {
    return reference?.find((r) => r.token === data?.symbolLevel2Category) ?? {};
  }, [data, reference]);

  return (
    <div className="flex flex-row items-center text-gray-60 font-size-12px lh-16px gap-16px">
      <div className="fw-normal">{LG(lang.ReferenceRate)}</div>
      <div className="fw-medium">{data.symbolLevel2Category}</div>
      <div className={row}>
        <span>O/N</span>
        <span className="text-lime-500">{numToPercentage(refer?.ON)}</span>
      </div>
      {['7D', '1M', '1Y'].map((t) => (
        <div className={row} key={t}>
          <span>{t}</span>
          <span className="text-lime-500">{numToPercentage(refer?.[t])}</span>
        </div>
      ))}
    </div>
  );
}

function numToPercentage(nm: string) {
  if (!nm) {
    return '-';
  }
  return numUtil.floor(nm, 2, -2) + '%';
}
