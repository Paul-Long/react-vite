import {lang} from '@rx/lang/trade.lang';

export const genMargin = (LG: any) => [
  {label: LG(lang.CrossMargin), value: 'Cross'},
  {label: LG(lang.IsolatedMargin), value: 'Isolated'},
];

export const genDirection = (LG: any) => [
  {label: LG(lang.LongYieldFloater), value: 'Long'},
  {label: LG(lang.ShortYieldFixer), value: 'Short'},
];

export const genMode = (LG: any) => [
  {
    label: (
      <div className="flex flex-col justify-center items-center">
        <span>{LG(lang.YieldTrading)}</span>
        <span>{LG(lang.Mode)}</span>
      </div>
    ),
    value: 'Yield',
  },
  {
    label: (
      <div className="flex flex-col justify-center items-center">
        <span>{LG(lang.InterestRateSwap)}</span>
        <span>{LG(lang.Mode)}</span>
      </div>
    ),
    value: 'Rate',
  },
];
