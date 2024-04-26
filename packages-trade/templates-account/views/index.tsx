export {AccountView as component} from './AccountView';

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
