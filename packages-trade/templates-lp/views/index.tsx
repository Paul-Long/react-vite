export {LpView as component} from '@/views/LpView';

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
