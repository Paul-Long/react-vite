export {HomeTemplate as component} from './HomeTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: '',
        desc: '',
      },
    }),
  ];
}
