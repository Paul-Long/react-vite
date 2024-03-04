import {dirname, resolve} from 'node:path';
import {existsSync} from 'node:fs';

export function createAliasPlugin() {
  return {
    name: 'alias-plugin',
    resolveId(source, importer) {
      if (source.startsWith('@/')) {
        const packageDir = findNearestPackageDir(importer);
        if (packageDir) {
          const sourcePath = resolve(packageDir, source.slice(2));
          const tsFile = sourcePath + '.ts';
          if (existsSync(tsFile)) {
            return tsFile;
          }
          const tsxFile = sourcePath + '.tsx';
          if (existsSync(tsxFile)) {
            return tsxFile;
          }
          const indexTsFile = resolve(sourcePath, 'index.ts');
          if (existsSync(indexTsFile)) {
            return indexTsFile;
          }
          const indexTsxFile = resolve(sourcePath, 'index.tsx');
          if (existsSync(indexTsxFile)) {
            return indexTsxFile;
          }
        }
      }
      return null;
    },
  };
}

function findNearestPackageDir(file) {
  const parentDir = dirname(file);
  if (parentDir === '/') {
    return '/';
  }
  if (existsSync(resolve(parentDir, 'package.json'))) {
    return parentDir;
  }
  return findNearestPackageDir(parentDir);
}
