import {resolve} from 'node:path';
import {buildGlobalCss} from './build-global-css.mjs';

(async function main() {
  const cwd = process.cwd();
  const outputDir = resolve(cwd, '../../public/css');
  console.log(outputDir)
  await buildGlobalCss(cwd, outputDir, false);
  console.warn('build dev css success.');
})();
