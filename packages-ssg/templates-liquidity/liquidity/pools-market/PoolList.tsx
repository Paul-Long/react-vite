import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback} from 'react';

export function PoolList() {
  const {LG} = useLang();

  const genColumns = useCallback((): Column[] => {
    const columns: Column[] = [
      {title: LG(lang.Pool), dataIndex: 'Contract'},
      {title: LG(lang.Maturity), dataIndex: 'Maturity Date'},
      {
        title: LG(lang.Maturity),
        renderTitle: () => <span></span>,
        dataIndex: 'days',
      },
      {title: LG(lang.APR), dataIndex: 'APR'},
      {title: LG(lang.TML), dataIndex: 'TTM'},
      {title: LG(lang.TML), dataIndex: 'TVL'},
      {title: LG(lang.ActiveRadio), dataIndex: 'Active Ratio'},
      {title: LG(lang.RLPMSolValue), dataIndex: 'RLP Value'},
    ];
    columns.forEach((c: Column) => {
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
    Contract: 'RLP-mSOL',
    'Maturity Date': '',
    TTM: '-',
    APR: '-',
    TVL: '1.15 mSOL',
    'Active Ratio': '-',
    'RLP Value': '-',
  },
  {
    Contract: 'mSOL-2403',
    'Maturity Date': '2024/3/28',
    TTM: '30 days',
    APR: '9.987%',
    TVL: '500.00 mSOL',
    'Active Ratio': '2.0%',
    'RLP Value': '-',
  },
  {
    Contract: 'mSOL-2406',
    'Maturity Date': '2024/6/28',
    TTM: '122 days',
    APR: '8.358%',
    TVL: '30.00 mSOL',
    'Active Ratio': '4.0%',
    'RLP Value': '-',
  },
  {
    Contract: 'mSOL-2412',
    'Maturity Date': '2024/12/28',
    TTM: '305 days',
    APR: '8.281%',
    TVL: '20.00 mSOL',
    'Active Ratio': '6.0%',
    'RLP Value': '-',
  },
  {
    Contract: 'mSOL-2506',
    'Maturity Date': '2025/6/28',
    TTM: '487 days',
    APR: '8.570%',
    TVL: '15.00 mSOL',
    'Active Ratio': '8.0%',
    'RLP Value': '-',
  },
  {
    Contract: 'mSOL-2512',
    'Maturity Date': '2025/12/28',
    TTM: '670 days',
    APR: '8.394%',
    TVL: '25.00 mSOL',
    'Active Ratio': '10.0%',
    'RLP Value': '-',
  },
];
