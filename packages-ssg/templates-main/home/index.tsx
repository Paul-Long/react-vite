export {HomeTemplate as component} from './HomeTemplate';

export function getPageDataLoaders(locale: Locale, slug: string): ContentLoader[] {
  return [
    () => ({
      initValue: {
        title: 'RateX',
        desc: 'Any Future Earnings Can Be Exchanged',
      },
    }),
  ];
}
