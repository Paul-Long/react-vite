import {env} from '@rx/env';
import {numUtil} from '@rx/helper/num.ts';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable.ts';
import {useStream} from '@rx/hooks/use-stream.ts';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {contracts$} from '@rx/streams/config.ts';
import {positionUpdate$} from '@rx/streams/subscription/position.ts';
import {lastTrade$} from '@rx/streams/trade/last-trade.ts';
import {depositModal$} from '@rx/streams/wallet.ts';
import {rateXClient$} from '@rx/web3/streams/rate-x-client.ts';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {Big} from 'big.js';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {switchMap, throttleTime} from 'rxjs';

export function usePositions(mode: string) {
  const {LG} = useLang();
  const [client] = useStream(rateXClient$);
  const lastTrade = useObservable<any>(lastTrade$, {});
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
    const positions = await client?.getAllPositions();
    console.log('All Positions : ', positions);
    setData(positions ?? []);
  }, [client]);

  useEffect(() => {
    const columns: Column[] = [
      {
        title: LG(clang.No) + '.',
        dataIndex: 'id',
        fixed: env.isMobile ? false : 'left',
        width: env.isMobile ? 'auto' : '80px',
        shadowRight: true,
        headerCellStyle: {background: '#000'},
        bodyCellStyle: {background: '#000'},
        render: (_, i) => (i ?? 0) + 1,
      },
      {
        title: LG(lang.MarginType),
        dataIndex: 'marginType',
        render: (record) => (record.isIsolated ? LG(lang.Isolated) : LG(lang.Cross)),
      },
      {title: LG(clang.Contract), dataIndex: 'symbolName'},
      {title: 'YT', dataIndex: 'baseAssetAmount'},
      {title: 'ST', dataIndex: 'quoteAssetAmount'},
      {
        title: LG(clang.Direction),
        dataIndex: 'direction',
        render: (row: any) => (row.baseAssetAmount > 0 ? LG(clang.Long) : LG(clang.Short)),
      },
      {title: LG(clang.PnL), dataIndex: 'pnl', render: renderPnl},
      {title: LG(clang.Entry), dataIndex: 'entry', render: calcEntry},
      {title: LG(clang.Current), dataIndex: 'markPrice'},
      {title: LG(clang.Liq) + '.', dataIndex: 'liq'},
      {title: LG(clang.TP) + '/' + LG(clang.SL), dataIndex: 'tpsl'},
      {title: mode === 'YT' ? LG(clang.CR) : LG(clang.MR), dataIndex: 'cr'},
      {
        title: LG(clang.Margin),
        dataIndex: 'action',
        fixed: 'right',
        render: renderAction,
        shadowLeft: true,
        shadowRight: false,
        headerCellStyle: {background: '#000'},
        bodyCellStyle: {background: '#000'},
      },
    ];
    columns.forEach((c, i) => {
      if (i !== 0) {
        c.align = 'center';
      }
    });
    setColumns(columns);
  }, [LG, mode, client]);

  const calcEntry = (row: any) => {
    if (!row.baseAssetAmount || !row.quoteAssetAmount) {
      return '-';
    }
    return numUtil.trimEnd0(Big(row.quoteAssetAmount).div(row.baseAssetAmount).toFixed(9));
  };

  const contractsMap: Record<number, ConfigSymbol> = useMemo(() => {
    return contracts?.reduce((m, c) => ({...m, [c.id]: c}), {});
  }, [contracts]);

  const dataSource = useMemo(() => {
    return data?.map((d) => {
      const symbol = contractsMap?.[d.marketIndex] ?? {};
      return {...d, ...symbol, markPrice: lastTrade?.[symbol.symbol]?.MarkPrice ?? '-'};
    });
  }, [data, contractsMap, lastTrade]);

  const handleClose = useCallback(
    async (row: any) => {
      console.log(row);
      const {baseAssetAmount, marketIndex, userPda, userOrdersPda, marginType, direction} = row;
      const params = {
        marginType,
        marketIndex,
        amount: Math.abs(baseAssetAmount),
        orderType: 'MARKET',
        direction: direction === 'LONG' ? 'SHORT' : 'LONG',
        userPda,
        userOrdersPda,
      };
      try {
        await client?.closePosition(params);
      } catch (e) {
        console.error(e);
      }
    },
    [client]
  );

  const handleDeposit = async (row: any) => {
    depositModal$.next({visible: true, userPda: row.userPda, marketIndex: row.marketIndex});
  };

  const renderPnl = useCallback(
    (row: any) => {
      return (
        <div className="df fdr aic jcfe gap8px">
          <div className="flex-1 text-right">{row?.pnl}</div>
          <div className="flex-1 text-left"></div>
        </div>
      );
    },
    [client]
  );

  const renderAction = useCallback(
    (row: any) => {
      return (
        <div className="df fdr aic gap8px">
          <Button type="default" onClick={() => handleDeposit(row)}>
            {LG(clang.Deposit)}
          </Button>
          <Button disabled={row?.enableClose} type="default" onClick={() => handleClose(row)}>
            {LG(clang.Close)}
          </Button>
        </div>
      );
    },
    [client]
  );

  return {columns, dataSource};
}
