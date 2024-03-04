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
