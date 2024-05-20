interface RouteType {
  slug: string;
  loader: () => Promise<any>;
}

export const main = () => import('./components/Page');

export const routers: RouteType[] = [{slug: '/', loader: () => import('./home-v2')}];
