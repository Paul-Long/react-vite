import {useObservable} from '@rx/hooks/use-observable';
import {assets$, contractMap$} from '@rx/streams/config';
import {clsx} from 'clsx';
import {useEffect, useMemo, useState} from 'react';

export function AssetList({onContract}: {onContract: (con: string) => void}) {
  const assets = useObservable(assets$, []);

  const [asset, setAsset] = useState('SOL');
  const [contract, setContract] = useState('ALL');

  const contractMap = useObservable(contractMap$, {});
  const contracts = useMemo(() => {
    return contractMap?.[asset] ?? [];
  }, [contractMap, asset]);

  useEffect(() => {
    onContract(contract);
  }, [contract]);

  return (
    <div className="flex flex-col gap-20px">
      <div className="flex flex-row items-center">
        {assets.map((as) => (
          <div
            key={as.symbolCategory}
            className={clsx('px-32px py-12px cursor-pointer', [
              asset === as.symbolCategory && 'bg-lime-10 text-lime-500',
            ])}
            onClick={() => setAsset(as.symbolCategory)}
          >
            {as.symbolCategory}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center">
        <div
          className={clsx('py-4px px-12px box-border cursor-pointer')}
          onClick={() => setContract('ALL')}
        >
          <span
            className={clsx('border-b-2px border-b-solid lh-18px pb-2px', [
              contract === 'ALL'
                ? 'text-lime-500 border-b-lime-500 font-medium'
                : 'text-gray-60 border-b-transparent',
            ])}
          >
            ALL
          </span>
        </div>
        {contracts.map((con) => (
          <div
            key={con.symbolCategory}
            className={clsx('py-4px px-12px box-border cursor-pointer')}
            onClick={() => setContract(con.symbolCategory)}
          >
            <span
              className={clsx('border-b-2px border-b-solid lh-18px pb-2px', [
                contract === con.symbolCategory
                  ? 'text-lime-500 border-b-lime-500 fw-medium'
                  : 'text-gray-60 border-b-transparent',
              ])}
            >
              {con.symbolCategory}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
