import {env} from '@rx/env';
import {parsePathname} from '@rx/helper/locale';
import qs from 'query-string';
import {BehaviorSubject} from 'rxjs';

declare let SSR_LANGUAGE: Locale;

export const url$: BehaviorSubject<Url> | any = new BehaviorSubject<Url>(createInitUrl());

export function updateUrl(location, action, href) {
  url$.next(formatUrl(location, action, href));
}

function formatUrl(location, action, href): Url {
  const {pathname, search} = location;
  const query = qs.parse(search) as UrlQuery;
  const key = location.key;
  const {slug, locale} = parsePathname(pathname);
  return {action, slug, locale, pathname, query, key, href};
}

function createInitUrl(): Url {
  if (env.isServer) {
    const locale = typeof SSR_LANGUAGE === 'string' ? SSR_LANGUAGE : 'en';
    return {action: 'INIT', slug: '', locale, pathname: '', query: {}, key: 'default', href: ''};
  }

  return formatUrl(window.location, 'INIT', window.location.href);
}
