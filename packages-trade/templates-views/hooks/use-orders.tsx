import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {contracts$} from '@rx/streams/config';
import {positionUpdate$} from '@rx/streams/subscription/position';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {switchMap, throttleTime} from 'rxjs';

export function useOrders() {
  const {LG} = useLang();
  const [client] = useStream(rateXClient$);
  const contracts = useObservable<ConfigSymbol[]>(contracts$, []);
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!client) {
      return;
    }
    query().then();
    const subscription = positionUpdate$
      .pipe(throttleTime(100))
      .pipe(switchMap(() => query()))
      .subscribe(() => {});
    return () => {
      subscription.unsubscribe();
    };
  }, [client]);

  const query = useCallback(async () => {
    const orders = await client?.getAllOrders();
    console.log('All Orders : ', orders);
    setData(orders ?? []);
  }, [client]);

  useEffect(() => {
    const columns: Column[] = [
      {
        title: LG(clang.No) + '.',
        dataIndex: 'id',
        fixed: 'left',
        width: '80px',
        shadowRight: true,
        headerCellStyle: {background: '#030B0F'},
        bodyCellStyle: {background: '#030B0F'},
        render: (_, i) => (i ?? 0) + 1,
      },
      {
        title: LG(lang.MarginType),
        dataIndex: 'marginType',
        render: (record) => (record.isIsolated ? LG(lang.Isolated) : LG(lang.Cross)),
      },
      {
        title: LG(clang.Contract),
        align: 'left',
        dataIndex: 'contract',
        render: renderContract(LG),
      },
      {title: 'YT/ST', dataIndex: 'ytst', align: 'right', render: renderYtSt(LG)},
      {
        title: LG(clang.Margin),
        dataIndex: 'action',
        fixed: 'right',
        shadowLeft: true,
        headerCellStyle: {background: '#030B0F'},
        bodyCellStyle: {background: '#030B0F'},
        render: renderAction,
      },
    ];
    columns.forEach((c, i) => {
      if (i !== 0) {
        c.align = 'center';
      }
    });
    setColumns(columns);
  }, [LG, client]);

  const contractsMap: Record<number, ConfigSymbol> = useMemo(() => {
    return contracts?.reduce((m, c) => ({...m, [c.id]: c}), {});
  }, [contracts]);

  const dataSource = useMemo(() => {
    return data?.map((d) => ({...d, ...(contractsMap?.[d.marketIndex] ?? {})}));
  }, [data, contractsMap]);

  const handleCancel = async (row: any) => {
    let tx;
    if (row.isIsolated) {
      tx = await client?.cancelIsolatedOrder({
        userPda: row.userPda,
        userOrdersPda: row.userOrdersPda,
        orderId: row.orderId,
        marketIndex: row.marketIndex,
      });
    } else {
      tx = await client?.cancelOrder({
        userPda: row.userPda,
        userOrdersPda: row.userOrdersPda,
        orderId: row.orderId,
      });
    }
    if (tx) {
      await query();
    }
  };

  const renderAction = useCallback(
    (row: any) => {
      return (
        <div className="df fdr aic gap8px">
          <Button type="default" onClick={() => handleCancel(row)}>
            {LG(clang.Cancel)}
          </Button>
        </div>
      );
    },
    [client]
  );

  return {columns, dataSource};
}

function renderContract(LG: any) {
  return (row: any) => (
    <div className="flex flex-col">
      <span>{row.symbolName ?? ''}</span>
      <span className="text-green-500">
        {row.baseAssetAmount > 0 ? LG(clang.Long) : LG(clang.Short)}
      </span>
    </div>
  );
}

function renderYtSt(LG: any) {
  return (row: any) => (
    <div className="flex flex-col items-end w-full">
      <span>{row.baseAssetAmount ?? '-'} YT</span>
      <span>{row.quoteAssetAmount ?? '-'} ST</span>
    </div>
  );
}
