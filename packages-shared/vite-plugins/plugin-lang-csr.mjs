import {mkdirSync, existsSync, writeFileSync} from 'node:fs';
import {basename, extname, join} from 'node:path'
import {createRequire} from 'node:module';
import {genHash} from './util/hash.mjs';

const require = createRequire(import.meta.url);

const {build} = require('esbuild')
const {stringify} = require('json5');
const localeRecord = require('./locales.json')

const locales = Object.keys(localeRecord);
const baseLocale = 'en';

const transformCache = new Map();

export function csrLangFilePlugin(langRecordDic, outDir, buildId) {
  return {
    name: 'lang-plugin',
    async transform(code, id) {
      if (!id.endsWith('.lang.ts')) {
        return null;
      }
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }
      const guid = genHash(code);
      const output = join(outDir, `lang/${btoa('s-' + buildId).replace(/=+$/, '')}`);
      const outputFile = join(output, basename(id, extname(id)) + '.js');

      langRecordDic.set(id, guid);

      await build({entryPoints: [id], outdir: output})
      return await transform(code, outputFile, guid, outDir);
    },
  };
}

async function transform(code, id, guid, output) {
  if (transformCache.has(id)) {
    return transformCache.get(id);
  }

  await genLangFile(id, output, guid);

  const contents = `export const lang = window.__lang_${guid}__;`;
  transformCache.set(id, contents)
  return contents;
}

async function genLangFile(id, output, guid) {
  try {
    const {lang} = await import(id)
    for (const locale of locales) {
      const dir = join(output, 'client/lang');
      if (!existsSync(dir)) {
        await mkdirSync(dir, { recursive: true });
      }
      const file = join(dir, `${locale}-${guid}.js`)
      const langRecord = Object.keys(lang).reduce((record, field) => {
        return {...record, [field]: lang[field][locale] || lang[field][baseLocale]}
      }, {})
      await writeFileSync(file, `window.__lang_${guid}__=${stringify(langRecord)}`, 'utf8')
    }
  } catch (e) {
    console.log(id ,output, guid)
  }
}

function genId(guid, propertyName) {
  return genHash(guid + '-' + propertyName);
}
