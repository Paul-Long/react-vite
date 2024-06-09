import {lang} from '@rx/lang/trade.lang';
import {Tooltip} from '@rx/widgets';

export const genMargin = (LG: any) => [
  {label: LG(lang.CrossMargin), value: 'CROSS'},
  {label: LG(lang.IsolatedMargin), value: 'ISOLATED'},
];

export const genDirection = (LG: any) => [
  {
    label: (
      <Tooltip className="text-nowrap" text="Long YT, Profit from rising yield">
        {LG(lang.LongYieldFloater)}
      </Tooltip>
    ),
    value: 'LONG',
  },
  {
    label: (
      <Tooltip className="text-nowrap" text="Short YT, Profit from falling yield">
        {LG(lang.ShortYieldFixer)}
      </Tooltip>
    ),
    value: 'SHORT',
  },
];

export const genChartType = (LG: any) => [
  {label: <div className="text-nowrap px-12px min-w-80px">{LG(lang.YTPrice)}</div>, value: 'Price'},
  {
    label: <div className="text-nowrap px-12px min-w-120px">{LG(lang.ImpliedYield)}</div>,
    value: 'Yield',
  },
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
