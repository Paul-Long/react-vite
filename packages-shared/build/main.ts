import {findStaticTemplate} from '@rx/helper/template';
import {syncRouter} from '@rx/router/sync';
import {checkAuth} from '@rx/streams/auth';
import {loadConfig} from '@rx/streams/config';
import {loadEpochStartTime} from '@rx/streams/epoch';
import {updateUrl, url$} from '@rx/streams/url';
import {Buffer} from 'buffer';
import {filter, switchMap} from 'rxjs/operators';

let currentPathname: string;
let currentLocale: Locale;
let CurrentComponent: any = null;

declare global {
  interface Window {
    Buffer: any;
  }
}

export async function bootstrap(render: Function) {
  window.Buffer = Buffer;
  try {
    await Promise.all([checkAuth().then(), loadEpochStartTime().then(), loadConfig().then()]);
  } catch (e) {}
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
  const template = findStaticTemplate(locale, slug);
  if (!template) {
    console.warn('template not found');
    return;
  }
  try {
    await loadPage(locale ?? 'en', slug, template);
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
