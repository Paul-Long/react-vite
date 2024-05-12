import {usePageContext} from './use-page-context';

export function useLang() {
  const {LG} = usePageContext();
  return {LG};
}
