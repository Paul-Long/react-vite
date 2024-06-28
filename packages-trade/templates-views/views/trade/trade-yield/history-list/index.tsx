import {histories$, queryHistory$} from '@/streams/trade/history-list';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {abbreviateString} from '@rx/web3/utils/string';
import {Pagination} from '@rx/widgets/pagination';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useCallback, useEffect} from 'react';
import {styled} from 'styled-components';

const Contents = styled.div`
  cursor: pointer;
  &:hover .td {
    background: #2c2d2d !important;
    backdrop-filter: blur(200px);
  }
`;

const headerRow = 'bg-gray-4 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-4';

export function HistoryList() {
  const {LG} = useLang();
  const {address} = useConnect();
  const histories = useObservable(histories$, {total: 0, data: []});

  useEffect(() => {
    if (address) {
      handleChange(1);
    }
  }, [address]);

  const handleChange = useCallback(
    (current: number) => {
      if (!address) return;
      queryHistory$.next({pageNum: current - 1, pageSize: 10, address});
    },
    [address]
  );

  return (
    <div className="w-full flex flex-col">
      <div className={clsx('w-full grid grid-cols-auto-10 gap-y-12px text-gray-500')}>
        <div className="contents bg-gray-4 text-gray-60">
          <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(clang.No)}.</div>
          <div className={clsx(headerRow)}>{LG(lang.MarginType)}</div>
          <div className={clsx(headerRow)}>{LG(clang.Contract)}</div>
          <div className={clsx(headerRow)}>YT/ST</div>
          <div className={clsx(headerRow)}>{LG(clang.PnL)}/%</div>
          <div className={clsx(headerRow)}>{[LG(lang.Exec), LG(clang.Price)].join('/')}</div>
          <div className={clsx(headerRow)}>{LG(lang.OrderType)}</div>
          <div className={clsx(headerRow)}>{LG(lang.TradingFee)}</div>
          <div className={clsx(headerRow)}>{LG(lang.TxTime)}</div>
          <div className={clsx(headerRow)}>{LG(lang.TxHarsh)}</div>
        </div>
        {histories?.data?.map((row: Record<string, any>, i: number) => (
          <Contents key={i} className="contents">
            <div className={clsx(bodyRow, 'pl-10px sm:pl-20px')}>{(i ?? 0) + 1}</div>
            <div className={clsx(bodyRow)}>
              {row.PositionType === '1' ? LG(lang.Isolated) : LG(lang.Cross)}
            </div>
            <div className={clsx(bodyRow)}>{renderContract(LG)(row)}</div>
            <div className={clsx(bodyRow)}>{renderYtSt(row)}</div>
            <div className={clsx(bodyRow)}>{renderPnl(row)}</div>
            <div className={clsx(bodyRow)}>{renderYield(row)}</div>
            <div className={clsx(bodyRow)}>
              <div className="flex flex-col">
                <span>Market Order</span>
                <span>{row.OCType == '0' ? 'Open Position' : 'Close Position'}</span>
              </div>
            </div>
            <div className={clsx(bodyRow)}>
              <div className="w-full h-full">{row?.Fee ? numUtil.trimEnd0(row?.Fee) : '-'}</div>
            </div>
            <div className={clsx(bodyRow)}>
              <div className="w-full h-full">{row?.UpdateTime?.slice(0, 19)}</div>
            </div>
            <div className={clsx(bodyRow)}>
              <div className="w-full h-full">
                <a
                  className="underline-solid underline"
                  target="_blank"
                  href={`https://explorer.solana.com/tx/${row.ExecID}?cluster=devnet`}
                >
                  {abbreviateString(row.ExecID, 6, 4)}
                </a>
              </div>
            </div>
          </Contents>
        ))}
      </div>
      <div className="flex justify-end p-24px">
        <Pagination
          totalPages={Big(histories?.total).div(10).round(0, 3).toNumber()}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function renderContract(LG: any) {
  return (row: any) => (
    <div className="flex flex-col">
      <span>{row.Symbol ?? ''}</span>
      <span
        className={clsx(
          [row.Side === '1' && 'text-lime-500'],
          [row.Side === '2' && 'text-red-500']
        )}
      >
        {row.Side === '1' ? LG(clang.Long) : LG(clang.Short)}
      </span>
    </div>
  );
}

function renderYtSt(row: any) {
  return (
    <div className="flex flex-col w-full">
      <span>
        {row.LastQty ? (row.Side === '1' ? '' : '-') + numUtil.trimEnd0(row.LastQty) : '-'} YT
      </span>
      <span>
        {row.Info1 ? (row.Side === '1' ? '-' : '') + numUtil.trimEnd0(row.Info1) : '-'} ST
      </span>
    </div>
  );
}

function renderPnl(row: any) {
  return (
    <div className="w-full h-full flex flex-row items-start">
      <span
        className={clsx(
          [row.RealizedPnl > 0 && 'text-lime-500'],
          [row.RealizedPnl < 0 && 'text-red-500']
        )}
      >
        {row.RealizedPnl ? numUtil.trimEnd0(numUtil.floor(row.RealizedPnl, 6, 0)) : '-'}
      </span>
    </div>
  );
}

function renderYield(row: any) {
  return (
    <div className="w-full h-full flex flex-row items-start gap-4px">
      <span>{row.Yield ? Big(row.Yield).times(100).toFixed(2) + '%' : '-'}</span> /
      <span>{row.LastPx ? Big(row.LastPx).toFixed(9) : '-'}</span>
    </div>
  );
}
