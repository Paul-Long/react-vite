export {StrategyView as component} from './StrategyView';

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
