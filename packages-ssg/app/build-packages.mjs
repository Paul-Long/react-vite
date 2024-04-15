import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const buildPackages = [
  require('@ssg/main/package.json')
];
