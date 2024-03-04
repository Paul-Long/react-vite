import {resolve} from 'node:path';
import {buildGlobalCss} from './build-global-css.mjs';

(async function main() {
  const cwd = process.cwd();
  const outputDir = resolve(cwd, 'dist');
  await buildGlobalCss(cwd, outputDir, true);
  console.warn('build prod css success.');
})();
