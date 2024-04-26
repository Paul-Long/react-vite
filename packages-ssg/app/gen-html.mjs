import {buildPackages} from './build-packages.mjs';

(() => {
  for (const buildPackage of buildPackages) {
    import(`./dist/ssg/${buildPackage.buildId}/app-ssg.mjs`);
  }
})();
