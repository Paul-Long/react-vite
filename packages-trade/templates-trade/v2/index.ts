export {TradeMain as component} from './View';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'Trade',
        desc: 'Trade',
      },
    }),
  ];
}
