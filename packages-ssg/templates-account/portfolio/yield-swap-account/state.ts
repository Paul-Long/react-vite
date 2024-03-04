import {lang} from '@rx/lang/account.lang';
import {lang as clang} from '@rx/lang/common.lang';
import type {Column} from '@rx/widgets/table/types';

export function genTabs(LG: any) {
  return [
    {text: LG(clang.Position), key: 'Position'},
    {text: LG(clang.Orders), key: 'Orders'},
    {text: LG(clang.History), key: 'History'},
  ];
}

export function genPositionColumns(LG: any) {
  const columns: Column[] = [
    {title: LG(clang.No) + '.', dataIndex: 'index'},
    {title: LG(lang.MarginType), dataIndex: 'marginType'},
    {title: LG(clang.Contract), dataIndex: 'contract'},
    {title: LG(clang.Notional), dataIndex: 'notional'},
    {title: LG(clang.Direction), dataIndex: 'direction'},
    {title: LG(clang.PnL), dataIndex: 'pnl'},
    {title: LG(clang.Entry), dataIndex: 'entry'},
    {title: LG(lang.Current), dataIndex: 'current'},
    {title: LG(clang.Liq) + '.', dataIndex: 'liq'},
    {title: LG(clang.TP) + '/' + LG(clang.SL), dataIndex: 'tpSl'},
    {title: LG(clang.MR), dataIndex: 'mr'},
    {title: LG(clang.Margin), dataIndex: 'margin'},
  ];
  columns.forEach((c) => {
    c.headerCellStyle = {
      color: '#fff',
      background: '#0A253D',
    };
  });
  return columns;
}
