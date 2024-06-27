import {positions$, query$} from '@/streams/positions';
import {waiverQuery$} from '@/streams/trade/cross-margin';
import {positionMarginType$} from '@/streams/trade/page-state';
import {NoData} from '@/views/trade/trade-yield/NoData';
import {ClosePosition} from '@/views/trade/trade-yield/position-list/ClosePosition';
import {ClosePositionModal} from '@/views/trade/trade-yield/position-list/ClosePositionModal';
import {DownIcon} from '@rx/components/icons/DownIcon';
import {DepositModal} from '@rx/components/wallet/DepositModal';
import {WithdrawModal} from '@rx/components/wallet/WithdrawModal';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {depositModal$, withdrawModal$} from '@rx/streams/wallet';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Tooltip} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useMemo} from 'react';
import {styled} from 'styled-components';

const Contents = styled.div`
  cursor: pointer;
  &:hover .td {
    //background: #2c2d2d !important;
    //backdrop-filter: blur(200px);
  }
`;

const headerRow = 'bg-gray-4 py-8px';
const bodyRow = 'td flex flex-row items-center';

export function PositionList() {
  const {LG} = useLang();
  const {marginType, dataSource, client} = useDataSource();

  return (
    <>
      <div className={clsx('w-full grid grid-cols-auto-6 gap-y-12px text-gray-500')}>
        <div className="contents bg-gray-4 text-gray-60">
          <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(clang.Contract)}</div>
          <div className={clsx(headerRow)}>YT/ST</div>
          <div className={clsx(headerRow)}>{LG(clang.PnL)}/%</div>
          <div className={clsx(headerRow)}>{[LG(clang.Entry), LG(clang.Current)].join('/')}</div>
          <div className={clsx(headerRow)}>
            <div className="flex flex-row">
              <Tooltip
                text={`CR(collateral ratio) is your position's health indicator. When it turns Red, add margin or face liquidation.`}
              >
                <span className="underline underline-dotted">{LG(clang.CR)}</span>
              </Tooltip>
              {'/' + LG(clang.Liq) + '.' + LG(clang.Price)}
            </div>
          </div>
          <div className={clsx(headerRow, 'text-right pr-20px')}>{LG(clang.Margin)}</div>
        </div>
        {dataSource?.map((row, i) => (
          <Contents key={i} className="contents">
            <div className={clsx(bodyRow, 'gap-8px pl-10px sm:pl-20px')}>
              {renderContract(LG)(row)}
            </div>
            <div className={clsx(bodyRow)}>{renderYtSt(LG)(row)}</div>
            <div className={clsx(bodyRow)}>{renderPNL(LG)(row)}</div>
            <div className={clsx(bodyRow)}>{renderEntry(row)}</div>
            <div className={clsx(bodyRow)}>{renderCrLip(marginType)(row)}</div>
            <div className={clsx(bodyRow)}>{renderMargin(client)(row)}</div>
          </Contents>
        ))}
      </div>
      {!dataSource?.length && <NoData className="mt-12px" description={LG(lang.NoDataAvailable)} />}
      <ClosePositionModal />
      <DepositModal />
      <WithdrawModal />
    </>
  );
}

function useDataSource() {
  const [client] = useStream(rateXClient$);
  const [marginType] = useStream(positionMarginType$);
  const positions = useObservable(positions$, []);

  const dataSource = useMemo(() => {
    const pos = positions.filter((p) => p.marginType === marginType);
    if (marginType === 'CROSS' && pos?.length > 0) {
      const pnl = pos
        .reduce((sum, p) => {
          return sum.add(p.pnl);
        }, Big(0))
        .round(9, 0)
        .toNumber();
      return [
        {
          parent: true,
          asset: 'SOL',
          pnl,
          cr: pos[0].cr,
          margin: pos[0].margin,
          userPda: pos[0].userPda,
        },
        ...pos.filter((p) => p.baseAssetAmount != 0),
      ];
    }
    return pos;
  }, [positions, marginType]);

  return {marginType, dataSource, client};
}

function renderContract(LG: any) {
  return (row: any) => {
    if (row.parent) return '';
    return (
      <div className="flex flex-col">
        <span>{row.symbolName ?? ''}</span>
        <span className={clsx(row.baseAssetAmount > 0 ? 'text-lime-500' : 'text-red-500')}>
          {row.baseAssetAmount > 0 ? LG(clang.Long) : LG(clang.Short)}
        </span>
      </div>
    );
  };
}

function renderYtSt(LG: any) {
  return (row: any) => {
    if (row.parent) return '';
    return (
      <div className="flex flex-col">
        <span>{row.baseAssetAmount ?? '-'} YT</span>
        <span>{row.quoteAssetAmount ?? '-'} ST</span>
      </div>
    );
  };
}

function renderPNL(LG: any) {
  return (row: any) => (
    <div className="flex flex-col justify-start">
      <div className={clsx([row.pnl > 0 && 'text-lime-500'], [row.pnl < 0 && 'text-red-500'])}>
        {row?.pnl}
      </div>
      {row.marginType !== 'CROSS' && (
        <div className={clsx([row.pnl > 0 && 'text-lime-500'], [row.pnl < 0 && 'text-red-500'])}>
          {!!row?.pnl && !!row?.margin
            ? Big(row?.pnl).times(100).div(row.margin).toFixed(2) + '%'
            : '-'}
        </div>
      )}
    </div>
  );
}

function renderEntry(row: any) {
  if (row.parent) return '';
  return (
    <div className="h-full flex flex-row items-start gap-4px">
      <span>{row.entry ?? '-'}</span>/<span>{row.LastPrice ?? '-'}</span>
    </div>
  );
}

function renderCrLip(marginType: 'CROSS' | 'ISOLATED') {
  return (row: any) => {
    if (!row.parent && marginType === 'CROSS') return '';
    return (
      <div className="h-full flex flex-row items-start gap-4px">
        <span
          className={clsx([
            Number(row.cr) < 1.06
              ? 'text-red-500'
              : Number(row.cr) <= 1.08
              ? 'text-yellow-500'
              : 'text-white',
          ])}
        >
          {!!row.cr ? Big(row.cr).times(100).toFixed(2) + '%' : '-'}
        </span>
        /<span>{row.lipPrice}</span>
      </div>
    );
  };
}

function renderMargin(client: any) {
  return (row: any) =>
    row.parent || row.marginType === 'ISOLATED' ? (
      <div className="w-full h-full flex flex-row items-start justify-right gap-8px pr-20px">
        {numUtil.floor(row?.margin ?? 0, 6)} SOL
        <div className="flex flex-row items-center gap-8px">
          <Tooltip text="Deposit">
            <div
              className="flex justify-center items-center rounded-2px w-24px h-24px cursor-pointer border-1px border-solid border-lime-500"
              onClick={() => handleDeposit(row)}
            >
              <DownIcon color="#8DCC2F" />
            </div>
          </Tooltip>
          <Tooltip text="Withdraw">
            <div
              className={clsx(
                'flex justify-center items-center rounded-2px w-24px h-24px rotate-180 cursor-pointer border-1px border-solid border-#2C2D2D',
                [row.parent && 'ml-3px']
              )}
              onClick={() => handleWithdraw(row)}
            >
              <DownIcon color="#F6F7F3" />
            </div>
          </Tooltip>
          {row.marginType === 'ISOLATED' && (
            <div className="w-1px h-24px box-border border-1px border-solid border-gray-40"></div>
          )}
          {row.marginType === 'ISOLATED' && <ClosePosition row={row} client={client} />}
        </div>
      </div>
    ) : (
      <div className="w-full h-full flex justify-end gap-8px pr-20px">
        <ClosePosition row={row} client={client} />
      </div>
    );
}

const handleDeposit = async (row: any) => {
  depositModal$.next({
    visible: true,
    userPda: row.userPda,
    marginIndex: 0,
    onFinish: () => {
      waiverQuery$.next(0);
      query$.next(0);
    },
  });
};

const handleWithdraw = async (row: any) => {
  withdrawModal$.next({
    visible: true,
    userPda: row.userPda,
    marketIndex: row.marketIndex,
    marginIndex: 0,
    onFinish: () => {
      query$.next(0);
      waiverQuery$.next(0);
    },
  });
};
