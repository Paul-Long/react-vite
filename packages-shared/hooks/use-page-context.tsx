import {ReactNode, createContext, useContext} from 'react';
import {useLocation} from 'react-router-dom';

const Context = createContext<PageContext>({
  slug: '/',
  locale: 'en',
  LG: genLG('en'),
  fixLink: genFixLink(),
});

interface PageContext {
  slug: string;
  locale: string;
  LG: (langItem: LangItem, params?: Record<string, string>) => string;
  fixLink?: (link: string) => string;
}

export function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ReactNode;
}) {
  const location = useLocation();
  const record: any = parsePathname(location.pathname);
  record.slug = pageContext?.slug || record.slug;
  record.locale = pageContext?.locale || record.locale;
  record.LG = genLG(record.locale ?? DEFAULT_LOCALE);
  record.fixLink = genFixLink(record.locale);
  return <Context.Provider value={record}>{children}</Context.Provider>;
}

export function usePageContext() {
  return useContext(Context);
}

export const DEFAULT_LOCALE: Locale = 'en';

export const localeRecord: Record<string, LocaleConfig> = {
  en: {browser: 'en', html: 'en-US', appStore: 'us', name: 'English'},
  zh: {browser: 'zh', html: 'zh-CN', appStore: 'zh', name: ' 中文'},
  ru: {browser: 'ru', html: 'ru-RU', appStore: 'ru', name: 'Русский'},
  ko: {browser: 'ko', html: 'ko-KR', appStore: 'kr', name: '한국어'},
  ja: {browser: 'ja', html: 'ja-JP', appStore: 'jp', name: '日本語'},
  es: {browser: 'es', html: 'es-ES', appStore: 'es', name: 'Español'},
  de: {browser: 'de', html: 'de-DE', appStore: 'de', name: 'Deutsch'},
  fr: {browser: 'fr', html: 'fr-FR', appStore: 'fr', name: 'Français'},
  tr: {browser: 'tr', html: 'tr-TR', appStore: 'tr', name: 'Türkçe'},
  pt: {browser: 'pt', html: 'pt-PT', appStore: 'pt', name: 'Português'},
  vi: {browser: 'vi', html: 'vi-VN', appStore: 'vi', name: 'tiếng Việt'},
};

export function isLocale(segment0: string) {
  return localeRecord.hasOwnProperty(segment0);
}

export function parsePathname(pathname: string): {locale: Locale | null; slug: string} {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 1) {
    return {locale: null, slug: '/'};
  }

  const segment0: any = segments[0];
  if (isLocale(segment0)) {
    return {locale: segment0, slug: '/' + segments.slice(1).join('/')};
  }
  return {locale: null, slug: pathname};
}

export function genLG(locale: Locale) {
  return function (langItem: LangItem | string, params?: Record<string, string>) {
    if (!langItem) {
      console.warn('lang is empty');
      return '';
    }
    if (typeof langItem === 'string') {
      return replaceParams(langItem, params);
    }
    return replaceParams(langItem[locale] || langItem['en'], params);
  };
}

function replaceParams(template: string, params?: Record<string, string>) {
  if (!template) {
    return '';
  }
  if (params) {
    return format(template, params);
  }
  return template;
}

function format(template: string, params: Record<string, string>) {
  return Object.keys(params).reduce(
    (p, c) => p.replace(new RegExp(['(\\{', c, '\\})'].join(''), 'g'), params[c]),
    template
  );
}

export function genFixLink(locale?: Locale) {
  return function (link: string) {
    if (!locale) {
      return link;
    }
    if (link === '/') {
      return '/' + locale;
    }
    return '/' + locale + link;
  };
}
