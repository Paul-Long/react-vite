import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const buildPackages = [
  require('@trade/views/package.json'),
];
