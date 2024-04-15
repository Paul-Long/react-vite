import {basename, extname, resolve} from 'node:path';
import {writeFileSync, mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';

const require = createRequire(import.meta.url);
const {compileAsync} = require('sass');

export async function buildGlobalCss(cwd, outputDir, withHash) {
  const startTime = Date.now();
  const scssFiles = [
    {
      media: '',
      path: resolve(cwd, 'global.scss'),
    },
  ];
  mkdirSync(outputDir, {recursive: true});
  const globalCssFiles = await Promise.all(
    scssFiles.map(async ({path, media}) => {
      const result = await compileAsync(path, {style: 'compressed'});
      const content = result.css;
      const fileName = genFileName(path, withHash, content);
      writeFileSync(resolve(outputDir, fileName), content, 'utf8');
      return {media, fileName};
    })
  ).catch((e) => {
    console.error(e)
  });

  console.log('Generate global css files time:', Date.now() - startTime);
  return {globalCssFiles};
}

function genHash(str, len = 6) {
  const md5 = createHash('md5');
  const result = md5.update(str).digest('hex');
  return result.slice(-len);
}

function genFileName(path, withHash, content) {
  const rawFileName = basename(path, extname(path));
  if (withHash) {
    return `${rawFileName}-${genHash(content)}.css`;
  }
  return `${rawFileName}.css`;
}
