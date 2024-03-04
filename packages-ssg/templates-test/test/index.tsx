export {TestTemplate as component} from './TestTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'Test',
        desc: 'Test',
      },
    }),
  ];
}
