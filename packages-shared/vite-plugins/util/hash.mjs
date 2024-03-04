import {createHash} from 'node:crypto';

export function genHash(str, len = 6) {
  const md5 = createHash('md5');
  const result = md5.update(str).digest('hex');
  return result.slice(-len);
}
