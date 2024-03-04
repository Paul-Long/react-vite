import {DEFAULT_LOCALE, localeRecord} from '@rx/config/locales';

export function isLocale(segment0) {
  return localeRecord.hasOwnProperty(segment0);
}

export function parsePathname(pathname): {locale: Locale; slug: string} {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 1) {
    return {locale: DEFAULT_LOCALE, slug: '/'};
  }

  const segment0 = segments[0];
  if (isLocale(segment0)) {
    return {locale: segment0, slug: '/' + segments.slice(1).join('/')};
  }
  return {locale: DEFAULT_LOCALE, slug: pathname};
}
