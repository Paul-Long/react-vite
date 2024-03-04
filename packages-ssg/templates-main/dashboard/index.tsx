export {DashboardTemplate as component} from './DashboardTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'Dashboard',
        desc: 'Dashboard',
      },
    }),
  ];
}
