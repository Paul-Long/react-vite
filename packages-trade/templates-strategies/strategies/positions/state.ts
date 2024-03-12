import {lang} from '@rx/lang/account.lang';
import {lang as clang} from '@rx/lang/common.lang';

export function genTabs(LG: any) {
  return [
    {text: LG(clang.Earn), key: 'Earn'},
    {text: LG(lang.CarryTrade), key: 'CarryTrade'},
    {text: LG(lang.SyntheticAsset), key: 'SyntheticAsset'},
  ];
}
