import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const buildPackages = [
  require('@trade/account/package.json'),
  require('@trade/lp/package.json'),
  require('@trade/market/package.json'),
  require('@trade/strategies/package.json'),
  require('@trade/trade/package.json'),
];
