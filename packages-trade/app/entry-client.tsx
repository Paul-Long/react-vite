import {localeRecord, PageContextProvider} from '@rx/hooks/use-page-context';
import {checkAuth} from '@rx/streams/auth';
import {loadConfig} from '@rx/streams/config';
import {loadEpochStartTime} from '@rx/streams/epoch';
import {initWorker} from '@rx/streams/worker';
import {main, routers} from '@trade/views/routers';
import DataWorker from '@trade/worker/index?worker';
import {Buffer} from 'buffer';
import {lazy, ReactNode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'virtual:uno.css';

window.Buffer = Buffer;

(async () => {
  initWorker(() => new DataWorker());
})();

(async () => {
  try {
    await Promise.all([checkAuth().then(), loadEpochStartTime().then(), loadConfig().then()]);
  } catch (e) {}
})();

const Page = lazy(main);

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <PageContextProvider pageContext={null as any}>
      <Suspense>
        <Routes>
          <Route path="/" element={<Page />}>
            {routers.map(({slug, loader}: any) => {
              const Component = lazy(loader);
              const routes: ReactNode[] = [];
              if (slug === '/') {
                routes.push(<Route key={slug} index element={<Component />}></Route>);
              } else {
                routes.push(<Route key={slug} path={slug} element={<Component />}></Route>);
              }
              Object.keys(localeRecord).forEach((locale: string) => {
                const path = ['/' + locale, slug].join('');
                routes.push(<Route key={path} path={path} element={<Component />}></Route>);
              });
              return routes;
            })}
          </Route>
        </Routes>
      </Suspense>
    </PageContextProvider>
  </BrowserRouter>
);
