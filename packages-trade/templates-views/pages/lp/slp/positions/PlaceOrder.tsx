import {RemoveInfo} from '@/pages/lp/slp/positions/RemoveInfo';
import {InputNumber} from '@/pages/trade/place-order/InputNumber';
import {query$} from '@/streams/lp/positions';
import {removeAllQuery$, removeQuery$} from '@/streams/lp/remove';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {symbolMapById$} from '@rx/streams/config';
import {ttmMap$} from '@rx/streams/epoch';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {IMAGES} from '../../const';

export function PlaceOrder({data, contract}: any) {
  const {LG} = useLang();
  const {value, action, symbol, handleAction, handleChange, handleConfirm} = useAction(data);

  return (
    <div className="flex flex-col w-full">
      <div
        className={clsx(
          'flex flex-row items-center font-size-14px lh-16px text-gray-600 px-8px py-16px',
          'border-b-1px border-solid border-gray-80'
        )}
      >
        <div
          className={clsx('flex-1 flex justify-center py-8px rounded-4px cursor-pointer', [
            action === 'Deposit' && 'text-white bg-gray-80',
          ])}
          onClick={() => handleAction('Deposit')}
        >
          {LG(clang.Deposit)}
        </div>
        <div
          className={clsx('flex-1 flex justify-center py-8px rounded-4px cursor-pointer', [
            action === 'Withdraw' && 'text-white bg-gray-80',
          ])}
          onClick={() => handleAction('Withdraw')}
        >
          {LG(clang.Withdraw)}
        </div>
      </div>
      <div className="flex flex-col px-16px pb-24px">
        <div className={clsx('flex flex-col py-8px', 'border-b-1px border-solid border-gray-80')}>
          <div className="flex flex-row items-center gap-8px">
            <img
              src={IMAGES[symbol?.symbolLevel2Category?.toUpperCase()]}
              alt=""
              width="24px"
              height="24px"
            />
            <span>{symbol?.symbol}</span>
          </div>
          <div className="flex flex-row items-center gap-8px">
            <span className="text-gray-600">{LG(lang.YourPosition)}</span>
            <span>{numUtil.floor(data?.total ?? 0, 6)}</span>
          </div>
        </div>
        <div
          className={clsx(
            'flex flex-col py-8px gap-8px',
            'border-b-1px border-solid border-gray-80'
          )}
        >
          <div className="flex flex-row item-center justify-between">
            <div className="text-gray-600">{LG(lang.Range)}</div>
            <div className="font-size-14px lh-20px ">
              {!data?.ammPosition?.lowerRate
                ? '-'
                : numUtil.floor(data?.ammPosition?.lowerRate, 2, -2)}
              % -{' '}
              {!data?.ammPosition?.upperRate
                ? '-'
                : numUtil.floor(data?.ammPosition?.upperRate, 2, -2)}
              %
            </div>
          </div>

          <div
            className={clsx('flex flex-row rounded-8px bg-gray-40 px-10px py-22px', [
              action === 'Withdraw' && 'pr-20px',
            ])}
          >
            <div className="flex flex-row items-center gap-8px">
              <img
                src={
                  IMAGES[
                    action === 'Deposit'
                      ? symbol?.symbolLevel2Category?.toUpperCase()
                      : symbol?.symbolLevel1Category?.toUpperCase()
                  ]
                }
                alt=""
                width="24px"
                height="24px"
              />
              <span>
                {action === 'Deposit'
                  ? symbol?.symbolLevel2Category?.toUpperCase()
                  : symbol?.symbolLevel1Category?.toUpperCase()}
              </span>
            </div>
            <InputNumber
              align="right"
              color="text-#FFD166"
              value={value}
              type={action === 'Deposit' ? 'number' : 'percentage'}
              onChange={handleChange}
              placeholder="0.00"
              step={4}
            />
          </div>
        </div>
        {action === 'Withdraw' && (
          <RemoveInfo data={data} percent={value} contract={contract}>
            <Button size="md" className="" type="primary" onClick={handleConfirm}>
              <div className="font-size-16px lh-16px fw-bold">{LG(clang[action])}</div>
            </Button>
          </RemoveInfo>
        )}

        {action === 'Deposit' && (
          <Button size="md" className="mt-24px" type="primary" onClick={handleConfirm}>
            <div className="font-size-16px lh-16px fw-bold">{LG(clang[action])}</div>
          </Button>
        )}
      </div>
    </div>
  );
}

type Action = 'Deposit' | 'Withdraw';

function useAction(data: any) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const mapById: any = useObservable(symbolMapById$, {});
  const ttmMap: any = useObservable(ttmMap$, {});

  const [action, setAction] = useState<Action>('Deposit');

  const symbol = useMemo(() => mapById?.[data?.marketIndex], [data, mapById]);
  const ttm = useMemo(() => {
    if (!symbol || !ttmMap) {
      return;
    }
    const key = [symbol.symbolLevel1Category, symbol.symbolLevel2Category, symbol.term].join('_');
    return ttmMap[key];
  }, [symbol, ttmMap]);

  const [client] = useStream(rateXClient$);

  const handleAction = useCallback(async (v: Action) => {
    setAction(v);
    setValue('');
  }, []);

  const handleChange = useCallback(
    (v: string) => {
      if (action === 'Withdraw') {
        if (!!v && Number(v) > 100) {
          v = '100';
        }
      }
      setValue(v);
    },
    [action]
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const {ammPosition, marketIndex, baseAssetAmount, userPda} = data;
    const {upperRate, lowerRate} = ammPosition || {};
    if (!ttm || !symbol || !client || action === 'Deposit') {
      return;
    }
    const params = {
      marketIndex,
      upperRate,
      lowerRate,
      rmLiquidityPercent: 100,
      maturity: ttm.seconds,
      baseAssetAmount: Big(baseAssetAmount).times(-1).toNumber(),
      userPda,
    };
    removeAllQuery$.next(params);
  }, [client, value, data, symbol, action, ttm]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const {ammPosition, marketIndex, baseAssetAmount, userPda} = data;
    const {upperRate, lowerRate} = ammPosition || {};
    if (!value || !ttm || !symbol || !client || action === 'Deposit') {
      return;
    }
    const params = {
      marketIndex,
      upperRate,
      lowerRate,
      rmLiquidityPercent: Big(value).toNumber(),
      maturity: ttm.seconds,
      baseAssetAmount: Big(baseAssetAmount).times(-1).toNumber(),
      userPda,
    };
    console.log('remove lp params : ', params);
    removeQuery$.next(params);
  }, [client, value, data, symbol, action, ttm]);

  const handleConfirm = useCallback(async () => {
    const {ammPosition, marketIndex, baseAssetAmount, userPda} = data;
    const {upperRate, lowerRate} = ammPosition || {};
    if (!value || !ttm || !symbol || !client) {
      return;
    }
    setLoading(true);
    if (action === 'Deposit') {
      const params = {marketIndex, upperRate, lowerRate, amount: value, maturity: ttm.seconds};
      console.log('add lp params : ', params);
      await client.addPerpLpShares(params);
      updateBalance$.next(0);
    } else {
      const params = {
        marketIndex,
        upperRate,
        lowerRate,
        rmLiquidityPercent: Big(value).toNumber(),
        maturity: ttm.seconds,
        baseAssetAmount: Big(baseAssetAmount).times(-1).toNumber(),
        userPda,
      };
      console.log('remove lp params : ', params);
      await client.removePerpLpShares(params);
      updateBalance$.next(0);
    }
    query$.next(0);
    setLoading(false);
  }, [client, value, data, symbol, action, ttm]);

  return {handleAction, handleChange, handleConfirm, action, value, symbol, loading};
}
