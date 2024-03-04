import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export function vitePluginNodeGlobals() {
  return {
    name: 'define-node-globals',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.js')) {
        return {
          code: code
            .replace(/\b__filename\b/g, JSON.stringify(fileURLToPath(import.meta.url)))
            .replace(/\b__dirname\b/g, JSON.stringify(dirname(fileURLToPath(import.meta.url)))),
          map: null, // 如果你需要 source map，可以设置这个字段
        };
      }
    },
  };
}
