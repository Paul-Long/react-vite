import {marketIndex$, positions$} from '@/streams/lp/positions';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {clsx} from 'clsx';
import {useEffect, useMemo, useState} from 'react';
import {PlaceOrder} from './PlaceOrder';

interface Props {
  contract: any;
}

export function LiveLPPosition({contract}: Props) {
  const positions = useObservable<any[]>(positions$, []);
  const [select, setSelect] = useState('');

  const data = useMemo(() => {
    return positions?.find((p) => p.key === select);
  }, [select, positions]);

  useEffect(() => {
    if (!select && positions.length > 0) {
      setSelect(positions[0].key);
      return;
    }
    if (positions.length > 0 && !positions.find((p) => p.key === select)) {
      setSelect(positions[0].key);
      return;
    }
    if (positions.length <= 0) {
      setSelect('');
      return;
    }
  }, [select, positions]);

  useEffect(() => {
    if (!!contract) {
      marketIndex$.next(contract.id);
    }
  }, [contract]);

  console.log('LP Live Positions : ', positions);

  return (
    <div className="flex flex-row items-start w-full gap-24px">
      <div className="flex flex-col w-full gap-20px">
        {positions?.map((p, i) => (
          <Position
            key={p.userPda}
            active={select === p.key}
            data={p}
            contract={contract}
            onClick={() => setSelect(p.key)}
          ></Position>
        ))}
      </div>

      <div className={clsx('w-full mx-auto mt-87px', [positions?.length > 0 ? 'hidden' : 'block'])}>
        <img src="https://static.rate-x.io/img/v1/c111c8/no-data.png" alt="" width="120" />
      </div>

      <div
        className={clsx('w-384px min-w-384px bg-gray-80 rounded-8px', [
          !!select && positions.length > 0 ? 'block' : 'hidden',
        ])}
      >
        <PlaceOrder data={data}></PlaceOrder>
      </div>
    </div>
  );
}

function Position({data, contract, active, onClick}: any) {
  const {LG} = useLang();
  const {ammPosition} = data || {};
  const {lowerRate, upperRate} = ammPosition || {};
  return (
    <div
      className={clsx('grid grid-cols-3 gap-34px box-border bg-#D9D9D90A rounded-8px w-full', [
        active ? 'border-2px border-solid border-green-500 p-14px' : 'p-16px',
      ])}
      onClick={onClick}
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
        <div className="font-size-18px lh-27px">{'-'}</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.EarnedFees)}</div>
        <div className="font-size-18px lh-27px">{'-'}</div>
      </div>
    </div>
  );
}
