type Locale = 'en' | 'ru' | 'ko' | 'ja' | 'es' | 'de' | 'fr' | 'tr' | 'pt' | 'vi';

interface LocaleConfig {
  locale?: Locale;
  name: string;
  browser: string;
  html: string;
  appStore: string;
}

type LangItem = Record<Locale, string>;
type LG = (langItem: LangItem) => string;

type FixLink = (link: string) => string;
