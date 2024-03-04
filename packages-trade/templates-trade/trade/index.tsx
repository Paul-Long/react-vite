export {TradeTemplate as component} from './TradeTemplate';

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
