interface RouteType {
  slug: string;
  loader: () => Promise<any>;
}

export const main = () => import('./views/page');

export const routers: RouteType[] = [
  {slug: '/', loader: () => import('./views/trade/market')},
  {slug: '/trade', loader: () => import('./pages/trade')},
  {slug: '/trade/:contract', loader: () => import('./pages/trade')},
  {slug: '/trade/contracts', loader: () => import('./pages/demo')},
  {slug: '/strategy', loader: () => import('./pages/strategy')},
  {slug: '/lp', loader: () => import('./pages/lp')},
  {slug: '/lp/slp', loader: () => import('./pages/lp/slp')},
  {slug: '/liquidity', loader: () => import('./views/trade/liquidity')},
  {slug: '/account', loader: () => import('./pages/account')},
  {slug: '/earn', loader: () => import('./pages/earn')},
  {slug: '/synth-stables', loader: () => import('./pages/synth-stables')},
];
