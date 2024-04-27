import {fileURLToPath} from 'node:url';

import {buildAll} from '@rx/build/build.mjs';
import {buildPackages} from './build-packages.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

(async () => {
  await buildAll({
    dirname: __dirname,
    worker: {entry: '../worker/index.ts', name: '@trade/worker'},
    csr: {entry: 'entry-client.tsx'},
    ssr: {entry: 'entry-server.tsx'},
    buildPackages,
  });
})();
