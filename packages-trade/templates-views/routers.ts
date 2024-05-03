interface RouteType {
  slug: string;
  loader: () => Promise<any>;
}

export const main = () => import('./components/Page');

export const routers: RouteType[] = [
  {slug: '/', loader: () => import('./pages/market')},
  {slug: '/trade', loader: () => import('./pages/trade')},
  {slug: '/trade/contracts', loader: () => import('./pages/demo')},
  {slug: '/strategy', loader: () => import('./pages/strategy')},
  {slug: '/lp', loader: () => import('./pages/lp')},
  {slug: '/account', loader: () => import('./pages/account')},
];