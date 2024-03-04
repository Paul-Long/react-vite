export {LiquidityTemplate as component} from './LiquidityTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'LP',
        desc: 'LP',
      },
    }),
  ];
}
