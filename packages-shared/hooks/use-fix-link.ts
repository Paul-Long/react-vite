import {usePageContext} from './use-page-context';

export function useFixLink(): {fixLink: (l: string) => string; slug: string} {
  const {fixLink, slug} = usePageContext();
  return {fixLink: fixLink as any, slug};
}
