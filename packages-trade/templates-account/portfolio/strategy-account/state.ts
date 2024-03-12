import {lang} from '@rx/lang/account.lang';
import {lang as clang} from '@rx/lang/common.lang';
import type {Column} from '@rx/widgets/table/types';

export function genTabs(LG: any) {
  return [
    {text: LG(clang.Earn), key: 'Earn'},
    {text: LG(lang.CarryTrade), key: 'CarryTrade'},
    {text: LG(lang.SyntheticAsset), key: 'SyntheticAsset'},
  ];
}

export function genEarnColumns(LG: any) {
  const columns: Column[] = [
    {title: LG(clang.No) + '.', dataIndex: 'index'},
    {title: LG(lang.PrincipalToken), dataIndex: 'token'},
    {title: LG(clang.Maturity), dataIndex: 'maturity'},
    {title: LG(clang.TTM), dataIndex: 'ttm'},
    {title: LG(clang.APR), dataIndex: 'apr'},
    {title: LG(lang.Underlying), dataIndex: 'underlying'},
    {title: LG(clang.Amount), dataIndex: 'amount'},
  ];
  columns.forEach((c) => {
    c.headerCellStyle = {
      color: '#fff',
      background: '#0A253D',
    };
  });
  return columns;
}
