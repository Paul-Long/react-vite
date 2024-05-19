import {lang} from '@rx/lang/trade.lang';

export const genMargin = (LG: any) => [
  {label: LG(lang.CrossMargin), value: 'CROSS'},
  {label: LG(lang.IsolatedMargin), value: 'ISOLATED'},
];

export const genDirection = (LG: any) => [
  {label: LG(lang.LongYieldFloater), value: 'LONG'},
  {label: LG(lang.ShortYieldFixer), value: 'SHORT'},
];

export const genChartType = (LG: any) => [
  {label: <div className="text-nowrap px-12px">{LG(lang.YTPrice)}</div>, value: 'price'},
  {label: <div className="text-nowrap px-12px">{LG(lang.ImpliedYield)}</div>, value: 'yield'},
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
