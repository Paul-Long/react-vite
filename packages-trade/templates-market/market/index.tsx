export {MarketTemplate as component} from '@/market/MarketTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'Dashboard',
        desc: 'Dashboard',
      },
    }),
  ];
}
