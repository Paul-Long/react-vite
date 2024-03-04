import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const buildPackages = [
  require('@rx-ssg/account/package.json'),
  require('@rx-ssg/liquidity/package.json'),
  require('@rx-ssg/main/package.json'),
  require('@rx-ssg/strategy/package.json'),
];
