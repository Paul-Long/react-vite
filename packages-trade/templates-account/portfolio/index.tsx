export {PortfolioTemplate as component} from './PortfolioTemplate';

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
