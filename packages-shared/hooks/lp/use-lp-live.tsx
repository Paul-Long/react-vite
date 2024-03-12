import {db, useQuery} from '@rx/db';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback, useEffect, useState} from 'react';
import {useLang} from '../use-lang';

export function useLpLive() {
  const {LG} = useLang();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const columns: Column[] = [
      {
        title: LG(clang.No) + '.',
        dataIndex: 'id',
        fixed: 'left',
        bodyCellStyle: {background: '#00162B'},
        render: (_, i) => (i ?? 0) + 1,
      },
      {title: LG(lang.Pool), dataIndex: 'Contract'},
      {title: LG(lang.Range), dataIndex: 'Range'},
      {
        title: LG(lang.LPValue),
        renderTitle: () => {
          return (
            <div className="df fdc aic">
              <span>{LG(lang.LPValue)}</span>
              <span>{LG(lang.TotalWithdrawable)}</span>
            </div>
          );
        },
        dataIndex: 'LPValue',
      },
      {
        title: LG(lang.EarnedFees),
        dataIndex: 'EarnedFees',
        render: (record) => {
          return (
            <div className="df fdr aic w100% gap8px">
              <div className="flex-1 text-right" style={{textAlign: 'right'}}>
                {record['EarnedFees']} {record['FeeCurrency']}
              </div>
              <div className="flex-1">
                <Button type="default" size="small">
                  {LG(lang.Claim)}
                </Button>
              </div>
            </div>
          );
        },
      },
      {
        title: LG(lang.AwardedRTX),
        dataIndex: 'AwardedRTX',
        render: (record) => {
          return (
            <div className="df fdr aic gap8px">
              <span className="flex-1 text-right">{record['AwardedRTX']}</span>
              <div className="flex-1">
                <Button type="default" size="small">
                  {LG(lang.Claim)}
                </Button>
              </div>
            </div>
          );
        },
      },
      {title: LG(lang.APR), dataIndex: 'APR'},
      {
        title: LG(clang.Liquidity),
        dataIndex: 'action',
        fixed: 'right',
        bodyCellStyle: {background: '#00162B'},
        render: (record: any) => {
          return (
            <div className="df gap10px">
              <Button type="default" size="small" style={{padding: '4px 6px'}}>
                <i className="iconfont font-size-18px">&#xe62c;</i>
              </Button>
              <Button type="default" size="small">
                {LG(clang.Deposit)}
              </Button>
              <Button type="default" size="small" onClick={() => handleWithdraw(record)}>
                {LG(clang.Withdraw)}
              </Button>
            </div>
          );
        },
      },
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
        fontWeight: 700,
      };
      if (c.dataIndex !== 'action') {
        c.bodyCellStyle = c.bodyCellStyle || {};
        c.bodyCellStyle.color = '#B7BDC6';
        c.bodyCellStyle.fontWeight = 700;
      }
    });
    setColumns(columns);
  }, [LG]);

  const dataSource = useQuery<any[]>(() => db.lpLivePosition.toArray());

  const handleWithdraw = useCallback(async (row: any) => {
    const {id, ...params} = row;
    await db.lpLivePosition.delete(id);
    await db.lpResidualPosition.add(params);
  }, []);

  return {columns, dataSource};
}
