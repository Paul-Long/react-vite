import {IMAGES} from '@/pages/lp/const';
import {apy$} from '@/streams/lp/apy';
import {positions$} from '@/streams/lp/position-all';
import {numUtil} from '@rx/helper/num';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {contracts$} from '@rx/streams/config';
import {ratePriceMap$} from '@rx/streams/market/rate-price';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {styled} from 'styled-components';

const Contents = styled.div`
  cursor: pointer;
  &:hover .td {
    background: #ffffff14 !important;
    backdrop-filter: blur(200px);
  }
`;

const headerRow = 'bg-gray-40 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-40';

export function SpecificPool({contract}: {contract: string}) {
  const {LG} = useLang();
  const {fixLink} = useFixLink();
  const navigate = useNavigate();
  const {dataSource, walletMap} = useDataSource();

  const dataList = useMemo(() => {
    if (!contract || contract === 'ALL') {
      return dataSource;
    }
    return dataSource?.filter((data: ConfigSymbol) => data.symbolLevel2Category === contract);
  }, [contract, dataSource]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full font-size-16px lh-24px fw-medium py-18px px-20px border-b-1px border-solid border-#2C2D2D">
        {LG(lang.SpecificLiquidityPool)}
      </div>
      <div className="w-full grid grid-cols-auto-7 gap-y-12px text-gray-500">
        <div className="contents bg-gray-40 text-gray-60">
          <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(lang.Pool)}</div>
          <div className={clsx(headerRow)}>{LG(lang.Wallet)}</div>
          <div className={clsx(headerRow)}>{LG(lang.APR)}</div>
          <div className={clsx(headerRow)}>{LG(lang.Maturity)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ExpireIn)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ActiveRadio)}</div>
          <div className={clsx(headerRow)}>{LG(lang.TVL)}</div>
        </div>
        {dataList?.map((d) => (
          <Contents
            key={d.symbol}
            className="contents"
            onClick={() => navigate(fixLink(`/liquidity/slp?symbol=${d.symbol}`))}
          >
            <div className={clsx(bodyRow, 'gap-8px py-12px pl-10px sm:pl-20px')}>
              <img
                src={IMAGES[d.symbolLevel2Category.toUpperCase()]}
                alt={d.symbol}
                width={24}
                height={24}
              />
              {d?.symbol}
            </div>
            <div className={clsx(bodyRow)}>
              ${walletMap[d.symbol] ? numUtil.delimit(walletMap[d.symbol]) : '-'}
            </div>
            <div className={clsx(bodyRow, 'text-lime-500')}>{d.apr ?? '-'}</div>
            <div className={clsx(bodyRow)}>{d.due ?? '-'}</div>
            <div className={clsx(bodyRow)}>{[d.ttm, d.unit].join(' ')}</div>
            <div className={clsx(bodyRow)}>{d.activeRatio ?? '-'}</div>
            <div className={clsx(bodyRow)}>
              {numUtil.trimEnd0(numUtil.floor(d.AvaLiquidity ?? 0, 2, 0))}
            </div>
          </Contents>
        ))}
      </div>
    </div>
  );
}

function useDataSource() {
  const apyList = useObservable(apy$, []);
  const lastTrade: any = useObservable(lastTrade$, {});
  const contracts = useObservable(contracts$, []);
  const ratePriceMap = useObservable<Record<string, any>>(ratePriceMap$, {});
  const positions = useObservable(positions$, []);

  const dataSource = useMemo(() => {
    return contracts?.map((con) => {
      const trade = lastTrade?.[con.symbol] || {};

      let activeRatio = '-';
      if (!!trade?.LastPrice) {
        activeRatio =
          Big(trade.LastPrice ?? '0')
            .times(con.kValue)
            .times(100)
            .round(2, 3)
            .toString() + '%';
      }

      const data = {...con, ...(trade ?? {}), activeRatio, due: con.dueDate?.slice(0, 11)};

      const apy = apyList?.find((a: any) => a.symbol === con.symbol && a.term === '7D');

      if (apy) {
        data.apr =
          Big(apy?.apr ?? 0)
            .times(100)
            .toFixed(4) + '%';
      }

      return data;
    });
  }, [contracts, lastTrade, apyList]);

  const walletMap = useMemo(() => {
    const price = ratePriceMap?.['SOLUSDT'];
    if (!price) {
      return {};
    }
    const symbolMap = positions.reduce<Record<string, Big>>((obj, pos) => {
      const {symbol} = pos.contract;
      if (!obj?.[symbol]) {
        obj[symbol] = Big(0);
      }
      obj[symbol] = obj[symbol].add(pos.total || 0);
      return obj;
    }, {});
    return Object.keys(symbolMap).reduce<Record<string, string>>((sum, symbol) => {
      sum[symbol] = symbolMap[symbol].times(price).round(2, 0).toString();
      return sum;
    }, {});
  }, [positions, ratePriceMap]);

  return {dataSource, walletMap};
}
