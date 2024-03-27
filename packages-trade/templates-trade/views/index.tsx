export {PageView as component} from './PageView';

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
