import { fileURLToPath } from 'url';
import {buildPackages} from './build-packages.mjs';

const __filename = fileURLToPath(import.meta.url);

(() => {
  for (const buildPackage of buildPackages) {
    import(`./dist/ssg/${buildPackage.buildId}/app-ssg.mjs`);
  }
})();
