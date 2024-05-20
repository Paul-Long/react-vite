import {localeRecord, PageContextProvider} from '@rx/hooks/use-page-context';
import {main, routers} from '@ssg/main/routers';
import {lazy, ReactNode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'virtual:uno.css';

const Page = lazy(main);

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <PageContextProvider pageContext={null as any}>
      <Suspense>
        <Routes>
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
        </Routes>
      </Suspense>
    </PageContextProvider>
  </BrowserRouter>
);
