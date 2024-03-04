type UrlQuery = Record<string, string>;
type RouteAction = 'INIT' | 'PUSH' | 'REPLACE' | 'GO_BACK' | 'GO_FORWARD';

interface NativeUrl {
  origin?: string;
  href: string;
  pathname: string;
  search?: string;
}

interface Url extends NativeUrl {
  // @ts-ignore
  action?: RouteAction;
  // @ts-ignore
  key?: string;
  locale: Locale;
  slug: string;
  query: UrlQuery;
}
