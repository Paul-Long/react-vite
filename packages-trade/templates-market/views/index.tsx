export {MarketView as component} from './MarketView';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'Market',
        desc: 'Market',
      },
    }),
  ];
}
