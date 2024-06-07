import {IMAGES} from '@/pages/lp/const';
import {apy$} from '@/streams/lp/apy';
import {filter$} from '@/streams/lp/filter';
import {numUtil} from '@rx/helper/num';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/lp.lang';
import {contracts$} from '@rx/streams/config';
import {ttmMap$} from '@rx/streams/epoch';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

export function SpecificPool() {
  const {LG} = useLang();
  const {fixLink} = useFixLink();
  const navigate = useNavigate();
  const {contracts} = useData();
  return (
    <div className="flex flex-col mt-38px">
      <div className="font-size-16px lh-20px fw-semibold">{LG(lang.SpecificLiquidityPool)}</div>
      <div className="grid grid-cols-6">
        <div className="contents font-size-14px lh-20px text-gray-600 py-10px">
          <div className="py-10px pl-18px">{LG(lang.Pool)}</div>
          <div className="py-10px text-center">{LG(lang.APR)}</div>
          <div className="py-10px text-center">{LG(lang.Maturity)}</div>
          <div className="py-10px text-center">{LG(lang.ExpireIn)}</div>
          <div className="py-10px text-right">{LG(lang.ActiveRadio)}</div>
          <div className="py-10px pr-32px text-right">{LG(lang.TVL)}</div>
        </div>
        {contracts.map((c) => (
          <div
            key={c.symbol}
            className="contents group cursor-pointer"
            onClick={() => navigate(fixLink(`/lp/slp?symbol=${c.symbol}`))}
          >
            <div
              className={clsx(
                'flex flex-row gap-12px py-20px pl-18px rounded-l-8px group-hover:bg-gray-80'
              )}
            >
              <img
                src={IMAGES[c.symbolLevel2Category.toUpperCase()]}
                alt=""
                width={28}
                height={28}
              />
              <div className="flex flex-col">
                <span className="font-size-14px lh-20px">{c.symbol}</span>
                <div className="flex flex-row items-center gap-4px">
                  {/*<span className="text-gray-400">Wallet: </span>*/}
                  {/*<span className="text-gray-600">$500.00</span>*/}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'text-green-500 py-20px flex justify-center items-center font-size-16px lh-20px fw-semibold group-hover:bg-gray-80'
              )}
            >
              {c.apr ?? '-'}
            </div>
            <div
              className={clsx(
                'flex justify-center items-center py-20px text-center group-hover:bg-gray-80'
              )}
            >
              {c.due ?? '-'}
            </div>
            <div
              className={clsx(
                'flex justify-center items-center py-20px text-center group-hover:bg-gray-80'
              )}
            >
              {c.maturityStr ?? ''}
            </div>
            <div className={clsx('flex justify-right py-20px group-hover:bg-gray-80')}>
              <span>{c.activeRatio}</span>
            </div>
            <div
              className={clsx(
                'flex flex-col justify-center items-end py-20px pr-32px rounded-r-8px group-hover:bg-gray-80'
              )}
            >
              <span>{numUtil.trimEnd0(numUtil.floor(c.AvaLiquidity ?? 0, 2, 0))}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function useData() {
  const [filter] = useStream(filter$);
  const apyList = useObservable(apy$, []);
  const ttmMap: any = useObservable(ttmMap$, {});
  const last = useObservable<Record<string, any>>(lastTrade$, {});
  const allContracts = useObservable(contracts$, []);

  const contracts = useMemo(() => {
    let contracts = [];
    if (!filter || filter === 'ALL') {
      contracts = allContracts;
    } else {
      contracts = allContracts.filter((c) => c.symbolLevel2Category === filter);
    }
    return contracts.map((c) => {
      const trade = last?.[c.symbol];
      let activeRatio = '-';
      if (!!trade?.LastPrice) {
        activeRatio =
          Big(trade.LastPrice ?? '0')
            .times(c.kValue)
            .times(100)
            .round(2, 3)
            .toString() + '%';
      }

      const key = [c.symbolLevel1Category, c.symbolLevel2Category, c.term].join('_');
      const apy = apyList?.find((a: any) => a.symbol === c.symbol && a.term === '7D');
      const tmp = {
        ...c,
        ...(trade || {}),
        apy,
        activeRatio,
        due: c.dueDate?.slice(0, 11),
        maturity: ttmMap?.[key]?.seconds,
        maturityStr: ttmMap?.[key].ttm + ttmMap?.[key].unit,
      };
      if (apy) {
        tmp.apr =
          Big(apy?.apr ?? 0)
            .times(100)
            .toFixed(4) + '%';
      }
      return tmp;
    });
  }, [filter, allContracts, last, ttmMap, apyList]);

  return {contracts};
}
