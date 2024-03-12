export {LPTemplate as component} from '@/lp/LPTemplate';

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
