import {usePageContext} from './use-page-context.tsx';

export function useFixLink() {
  const {fixLink, slug} = usePageContext();
  return {fixLink, slug};
}
