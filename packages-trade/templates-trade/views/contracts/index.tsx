export {Contracts as component} from './Contracts';

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
