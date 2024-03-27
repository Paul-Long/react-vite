import {findStaticTemplate} from '@rx/helper/template';
import {syncRouter} from '@rx/router/sync';
import {updateUrl, url$} from '@rx/streams/url';
import {filter, switchMap} from 'rxjs/operators';

let currentPathname: string;
let currentLocale: Locale;
let CurrentComponent: any = null;

export function bootstrap(render: Function) {
  syncRouter(updateUrl);
  url$.pipe(filter(routeFilter), switchMap(startRoute)).subscribe(() => {
    if (CurrentComponent) {
      render(CurrentComponent);
    }
  });
}

function routeFilter({action, pathname}: Url): boolean {
  if (['PUSH', 'REPLACE'].includes(action!) && pathname === currentPathname) {
    return false;
  }

  return true;
}

async function startRoute({pathname, locale, slug}: Url) {
  if (pathname === '/') {
    window.location.href = '/en';
    return;
  }
  const template = findStaticTemplate(locale, slug);
  if (!template) {
    console.warn('template not found');
    return;
  }
  try {
    await loadPage(locale, slug, template);
    currentPathname = pathname;
    currentLocale = locale;
  } catch (e) {
    console.warn(e);
  }
}

async function loadPage(locale: Locale, slug: string, template: Template) {
  const {component, getPageDataLoaders} = await template.loader(locale);
  if (CurrentComponent) {
    window.scroll({top: 0});
  }
  CurrentComponent = component;
}
