import {fileURLToPath} from 'node:url';

import {buildAll} from '@rx/build/build.mjs';
import {buildPackages} from './build-packages.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

(async () => {
  await buildAll({
    dirname: __dirname,
    worker: {entry: '../worker/index.ts', buildId: 200},
    csr: {entry: 'entry-client-prod.tsx'},
    ssr: {entry: 'entry-ssg.tsx'},
    buildPackages,
  });
})();
