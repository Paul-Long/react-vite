import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button, Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback} from 'react';

export function DataList() {
  const {LG} = useLang();

  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'No'},
      {title: LG(lang.Pool), dataIndex: 'Pool'},
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
        dataIndex: 'LP',
      },
      {
        title: LG(lang.EarnedFees),
        dataIndex: 'earnedFees',
        render: (record) => {
          return (
            <div className="df fdr aic w100%">
              <div className="flex-1 pr20px" style={{textAlign: 'right'}}>
                {record['Earned Fees']} {record['feeCurrency']}
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
        dataIndex: 'rtx',
        render: (record) => {
          return (
            <div className="df fdr aic gap12px">
              <span>{record['Awarded RTX']}</span>
              <Button type="default" size="small">
                {LG(lang.Claim)}
              </Button>
            </div>
          );
        },
      },
      {title: LG(lang.ARR), dataIndex: 'APR'},
      {
        title: LG(clang.Liquidity),
        dataIndex: 'Liquidity',
        render: () => {
          return (
            <div className="df gap10px">
              <Button type="default" size="small">
                {LG(clang.Add)}
              </Button>
              <Button type="default" size="small">
                {LG(clang.Remove)}
              </Button>
            </div>
          );
        },
      },
    ];
    columns.forEach((c) => {
      c.align = 'center';
      c.headerCellStyle = {fontWeight: 700};
      c.bodyCellStyle = {fontWeight: 700};
    });
    return columns;
  }, []);

  return <Table columns={genColumns()} dataSource={dataSource} />;
}

const dataSource = [
  {
    No: 1,
    Pool: 'mSOL-ULP',
    Range: '-',
    LP: '10.000(8.000) SOL',
    Currency: 'SOL',
    'Earned Fees': 0.5,
    feeCurrency: 'SOL',
    'Awarded RTX': 5,
    APR: '10.12%',
    Liquidity: null,
  },
  {
    No: 2,
    Pool: 'jitoSOL-2512',
    Range: '6.00%-8.00%',
    LP: '5.000(4.500) SOL',
    Currency: 'SOL',
    'Earned Fees': 0.3,
    feeCurrency: 'SOL',
    'Awarded RTX': 3,
    APR: '8.67%',
    Liquidity: null,
  },
  {
    No: 3,
    Pool: 'USDY-2606',
    Range: '3.00%-5.00%',
    LP: '5.000(4.500) USD',
    Currency: 'USD',
    'Earned Fees': 0.2,
    feeCurrency: 'USDY',
    'Awarded RTX': 2,
    APR: '6.54%',
    Liquidity: null,
  },
];
