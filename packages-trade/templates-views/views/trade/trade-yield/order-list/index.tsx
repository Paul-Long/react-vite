import {orders$, queryOrders$} from '@/streams/trade/order-list';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button} from '@rx/widgets';
import {clsx} from 'clsx';
import {useCallback} from 'react';
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

export function OrderList() {
  const {LG} = useLang();
  const {orders, renderAction} = useOrders();
  return (
    <div className={clsx('w-full grid grid-cols-auto-5 gap-y-12px text-gray-500')}>
      <div className="contents bg-gray-4 text-gray-60">
        <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(clang.No)}.</div>
        <div className={clsx(headerRow)}>{LG(lang.MarginType)}</div>
        <div className={clsx(headerRow)}>{LG(clang.Contract)}</div>
        <div className={clsx(headerRow)}>YT/ST</div>
        <div className={clsx(headerRow)}>{LG(clang.Margin)}</div>
      </div>
      {orders?.map((row: Record<string, any>, i: number) => (
        <Contents key={i} className="contents">
          <div className={clsx(bodyRow, 'pl-10px sm:pl-20px')}>{(i ?? 0) + 1}</div>
          <div className={clsx(bodyRow)}>{row.isIsolated ? LG(lang.Isolated) : LG(lang.Cross)}</div>
          <div className={clsx(bodyRow)}>{renderContract(LG)(row)}</div>
          <div className={clsx(bodyRow)}>{renderYtSt(LG)(row)}</div>
          <div className={clsx(bodyRow)}>{renderAction(LG)(row)}</div>
        </Contents>
      ))}
    </div>
  );
}

function useOrders() {
  const [client] = useStream(rateXClient$);
  const orders = useObservable(orders$, []);

  const handleCancel = async (row: Record<string, any>) => {
    let tx;
    if (row.isIsolated) {
      tx = await client?.cancelIsolatedOrder({
        userPda: row.userPda,
        orderId: row.orderId,
        marketIndex: row.marketIndex,
      });
    } else {
      tx = await client?.cancelOrder({
        userPda: row.userPda,
        orderId: row.orderId,
      });
    }
    queryOrders$.next(0);
  };

  const renderAction = useCallback(
    (LG: any) => (row: Record<string, any>) => {
      return (
        <Button
          size="sm"
          className="relative"
          disabled={row?.enableClose}
          type="default"
          style={{padding: '2px 6px', height: 24, fontSize: 12, lineHeight: '14px'}}
          onClick={() => handleCancel(row)}
        >
          {LG(clang.Cancel)}
        </Button>
      );
    },
    []
  );
  return {orders, renderAction};
}

function renderContract(LG: any) {
  return (row: any) => {
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
