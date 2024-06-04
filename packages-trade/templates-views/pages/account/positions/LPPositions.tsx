import {positions$, query$} from '@/streams/lp/position-all';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {clsx} from 'clsx';
import {useEffect} from 'react';

export function LPPositions() {
  const positions = useObservable(positions$, []);
  useEffect(() => {
    query$.next(0);
  }, []);
  return (
    <div className="flex flex-col p-24px gap-24px">
      {positions.map((p) => (
        <Position data={p} contract={{}}></Position>
      ))}
    </div>
  );
}

function Position({data}: any) {
  const {LG} = useLang();
  const {ammPosition, contract} = data || {};
  const {lowerRate, upperRate} = ammPosition || {};
  return (
    <div
      className={clsx('grid grid-cols-3 gap-34px box-border bg-#D9D9D90A rounded-8px w-full', [
        'p-16px',
      ])}
    >
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600 font-size-14px lh-21px">{LG(lang.Pool)}</div>
        <div className="font-size-18px lh-27px">{contract?.symbol ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.LPValueTotal)}</div>
        <div className="font-size-18px lh-27px">{numUtil.floor(data?.total, 6)} SOL</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Range)}</div>
        <div className="font-size-18px lh-27px text-yellow-500">
          {!lowerRate ? '-' : numUtil.floor(lowerRate, 2, -2)}% ~{' '}
          {!upperRate ? '-' : numUtil.floor(upperRate, 2, -2)}%
        </div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.APR)}</div>
        <div className="font-size-18px lh-27px text-green-500">{data.apr}%</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.EarnedFees)}</div>
        <div className="font-size-18px lh-27px">{data?.earnFee ?? '-'}</div>
      </div>
    </div>
  );
}
