import {ServerApp} from '@rx/build/ServerApp';
import {PageContextProvider, genLG, localeRecord} from '@rx/hooks/use-page-context.js';
import {main, routers} from '@ssg/main/routers';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderToString} from 'react-dom/server';
import {Route, Routes} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';
import {ServerStyleSheet} from 'styled-components';

declare const __ENTRY_FILE_NAME__: string;
declare const __ENTRY_CSS_FILES__: string[];
declare const __ENTRY_LANG_FILES__: string;

const __dirname = dirname(fileURLToPath(import.meta.url));
const locales: string[] = Object.keys(localeRecord);

(async () => {
  const {default: Page} = await main();
  for (let i = 0; i < routers.length; i++) {
    for (let j = 0; j < locales.length; j++) {
      const locale: any = locales[j];
      const route = routers[i];
      const {default: Component} = await route.loader();
      const langFiles = parserLang(locale);
      const sheet = new ServerStyleSheet();
      const innerHTML = renderToString(
        sheet.collectStyles(
          <StaticRouter location={route.slug}>
            <PageContextProvider
              pageContext={{slug: route.slug, locale: locale, LG: genLG(locale)}}
            >
              <Routes>
                <Route path="/" element={<Page />}>
                  <Route path={route.slug} element={<Component />} />
                </Route>
              </Routes>
            </PageContextProvider>
          </StaticRouter>
        )
      );
      const styles = sheet.getStyleElement();

      const html =
        '<!DOCTYPE html>' +
        renderToString(
          <ServerApp
            styles={styles as any}
            css={__ENTRY_CSS_FILES__}
            innerHtml={innerHTML}
            entry={__ENTRY_FILE_NAME__}
            lang={langFiles}
          />
        );
      writeHtmlFile(locale, route.slug, html);
    }
  }
})();

function writeHtmlFile(locale: Locale, slug: string, html: string) {
  const outputDir = resolve(__dirname, '../../client', locale, '.' + slug);
  mkdirSync(outputDir, {recursive: true});
  const file = resolve(outputDir, 'index.html');
  console.log(slug, `[${file}]`);
  writeFileSync(file, html, 'utf8');
  if (locale === 'en') {
    const outputDir = resolve(__dirname, '../../client', '.' + slug);
    mkdirSync(outputDir, {recursive: true});
    const file = resolve(outputDir, 'index.html');
    console.log(slug, `[${file}]`);
    writeFileSync(file, html, 'utf8');
  }
}

function parserLang(locale: string) {
  return Object.keys(__ENTRY_LANG_FILES__).map(
    (key: any) => `/lang/${locale}-${__ENTRY_LANG_FILES__[key]}.js`
  );
}
