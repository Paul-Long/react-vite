import {BehaviorSubject} from 'rxjs';
import {map, distinctUntilChanged} from 'rxjs/operators';
import {env} from '@rx/env';
import {url$} from './url';

declare global {
  interface Window {
    langDic: Record<string, string>;
  }
}

const initLanguage: Locale = url$.getValue().language;
export const LG$: any | BehaviorSubject<LG> = new BehaviorSubject(genLG(initLanguage));
export const language$ = new BehaviorSubject(initLanguage);

export const fixLink$: any | BehaviorSubject<FixLink> = new BehaviorSubject(function (o) {
  return o;
});

const distinctLocale$ = url$.pipe(
  map((url: Url) => url.locale),
  distinctUntilChanged()
);

distinctLocale$.subscribe((locale: Locale) => {
  language$.next(locale);
  LG$.next(genLG(locale));
  fixLink$.next(genFixLink(locale));
});

export function genLG(locale: Locale) {
  if (env.isServer) {
    return function (langItem: LangItem | string, params: Record<string, string>) {
      if (!langItem) {
        console.warn('lang is empty');
        return '';
      }
      return replaceParams(langItem[locale] || langItem['en'], params);
    };
  }

  return function (langItem: LangItem | string, params: Record<string, string>) {
    if (!langItem) {
      console.warn('lang is empty');
      return '';
    }

    // build mode
    if (typeof langItem === 'string') {
      return replaceParams(langItem, params);
    }

    // dev mode 未翻译的使用英语
    return replaceParams(langItem[locale] || langItem['en'], params);
  };
}

function replaceParams(template: string, params: Record<string, string>) {
  if (!template) {
    return '';
  }

  if (params) {
    return format(template, params);
  }

  return template;
}

function genFixLink(locale: Locale) {
  return function (link) {
    if (link === '/') {
      return '/' + locale;
    }
    return '/' + locale + link;
  };
}

function format(template: string, params: Record<string, string>) {
  return Object.keys(params).reduce(
    (p, c) => p.replace(new RegExp(['(\\{', c, '\\})'].join(''), 'g'), params[c]),
    template
  );
}
