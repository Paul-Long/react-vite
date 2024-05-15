import {positions$, query$} from '@/streams/positions';
import {env} from '@rx/env';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {depositModal$} from '@rx/streams/wallet';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {Big} from 'big.js';
import {useCallback, useEffect, useState} from 'react';

export function usePositions(mode: string) {
  const {LG} = useLang();
  const [client] = useStream(rateXClient$);
  const [columns, setColumns] = useState<Column[]>([]);
  const dataSource = useObservable(positions$, []);

  useEffect(() => {
    query$.next(0);
  }, []);

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
      {title: LG(clang.Current), dataIndex: 'LastPrice'},
      {title: LG(clang.Liq) + '.', dataIndex: 'liq', render: renderLipPrice},
      {title: LG(clang.TP) + '/' + LG(clang.SL), dataIndex: 'tpsl'},
      {
        title: LG(clang.CR),
        dataIndex: 'cr',
        render: (row: any) => (!!row.cr ? Big(row.cr).times(100).toFixed(2) + '%' : '-'),
      },
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
    return numUtil.trimEnd0(Big(row.quoteAssetAmount).div(row.baseAssetAmount).abs().toFixed(9));
  };

  const handleClose = useCallback(
    async (row: any) => {
      const {baseAssetAmount, marketIndex, userPda, userOrdersPda, marginType, direction} = row;
      console.log('Close Position : ', marketIndex, userPda, Math.abs(baseAssetAmount));
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

  const renderLipPrice = useCallback((record: any) => {
    if (!record.isIsolated) {
      return;
    }
    const {baseAssetAmount, quoteAssetAmount, margin} = record;
    if (baseAssetAmount > 0) {
      return Big(1.05 * Math.abs(quoteAssetAmount))
        .minus(margin)
        .div(baseAssetAmount)
        .toFixed(9);
    }
    return Big(Math.abs(quoteAssetAmount))
      .add(margin)
      .div(1.05 * Math.abs(baseAssetAmount))
      .toFixed(9);
  }, []);

  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return {columns, dataSource};
}
