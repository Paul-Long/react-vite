export {StrategyTemplate as component} from './StrategyTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'Strategy',
        desc: 'Strategy',
      },
    }),
  ];
}
