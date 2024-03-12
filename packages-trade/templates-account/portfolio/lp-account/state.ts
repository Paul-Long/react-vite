import {lang} from '@rx/lang/account.lang';

export function genTabs(LG: any) {
  return [
    {text: LG(lang.LiveLPPosition), key: 'Live'},
    {text: LG(lang.ResidualLPPosition), key: 'Residual'},
  ];
}
