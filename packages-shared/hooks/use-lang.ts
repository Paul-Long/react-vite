import {usePageContext} from './use-page-context.tsx';

export function useLang() {
  const {LG} = usePageContext();
  return {LG};
}
