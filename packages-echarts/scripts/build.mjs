import {resolve} from 'node:path';
import {mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

const cwd = process.cwd();
const outputDir = resolve(cwd, 'dist');

mkdirSync(outputDir, {recursive: true});

require('esbuild').build({
  entryPoints: ['index.ts'],
  bundle: true,
  minify: true,
  outdir: outputDir,
  entryNames: 'echarts-[hash]'
}).catch(() => process.exit(1));
