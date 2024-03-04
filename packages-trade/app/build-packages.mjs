import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const buildPackages = [
  require('@rx-trade/trade/package.json'),
];
