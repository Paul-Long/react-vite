import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {ServerApp} from '@rx/build/ServerApp';
import {localeRecord} from '@rx/config/locales';
import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import '@rx/helper/polyfill/rxjs';
import {getAllTemplates} from '@rx/helper/template';
import {LG$, genLG} from '@rx/streams/lang';
import {renderToString} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import 'templates-center';
import 'virtual:uno.css';

declare const __ENTRY_FILE_NAME__: string;
declare const __ENTRY_CSS_FILES__: string[];
declare const __ENTRY_LANG_FILES__: string;

const allTemplates = getAllTemplates();
const locales = Object.keys(localeRecord) as Locale[];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  for (const template of allTemplates) {
    const {component: Component, getPageDataLoaders} = await template.loader();
    console.log(template, allTemplates.length, __filename);
    for (const locale of locales) {
      LG$.next(genLG(locale));
      const langFiles = parserLang(locale);
      const sheet = new ServerStyleSheet();
      const innerHtml = renderToString(sheet.collectStyles(<Component />));
      const styles = sheet.getStyleElement();
      const sheet1 = new ServerStyleSheet();
      const html =
        '<!DOCTYPE html>' +
        renderToString(
          sheet1.collectStyles(
            <ServerApp
              styles={styles as any}
              css={__ENTRY_CSS_FILES__}
              innerHtml={innerHtml}
              entry={__ENTRY_FILE_NAME__}
              lang={langFiles}
            />
          )
        );
      writeHtmlFile(locale, template, html);
    }
  }
})();

function writeHtmlFile(locale: Locale, template: Template, html: string) {
  const outputDir = resolve(__dirname, '../../client', locale, '.' + template.slug);
  mkdirSync(outputDir, {recursive: true});
  const file = resolve(outputDir, 'index.html');
  console.log(template.slug, `[${file}]`);
  writeFileSync(file, html, 'utf8');
  if (locale === 'en') {
    const outputDir = resolve(__dirname, '../../client', '.' + template.slug);
    mkdirSync(outputDir, {recursive: true});
    const file = resolve(outputDir, 'index.html');
    console.log(template.slug, `[${file}]`);
    writeFileSync(file, html, 'utf8');
  }
}

function parserLang(locale: string) {
  return Object.keys(__ENTRY_LANG_FILES__).map(
    (key: any) => `/lang/${locale}-${__ENTRY_LANG_FILES__[key]}.js`
  );
}
