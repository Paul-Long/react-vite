import {lang} from '@rx/lang/account.lang';
import {lang as clang} from '@rx/lang/common.lang';

export function genTabs(LG: any) {
  return [
    {text: LG(lang.LiveLPPosition), key: 'LiveLPPosition'},
    {text: LG(lang.ResidualLPPosition), key: 'ResidualLPPosition'},
  ];
}

export function genLiveColumns(LG: any) {
  const columns: any[] = [
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
