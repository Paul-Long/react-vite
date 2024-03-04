type Locale = 'en' | 'ru' | 'ko' | 'ja' | 'es' | 'de' | 'fr' | 'tr' | 'pt' | 'vi';

interface LocaleConfig {
  locale?: Locale; // 显示名称
  name: string; // 显示名称
  browser: string; // 浏览器中的语言信息
  html: string; // html 标签上的语言信息
  appStore: string; // App 应用商店的语言信息
}

type LangItem = Record<Locale, string>;
type LG = (langItem: LangItem) => string;

type FixLink = (link: string) => string;
