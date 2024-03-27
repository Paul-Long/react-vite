import * as pako from 'pako';

const DEFAULT_LEVEL: number = 6;

const zip = (data: string | Uint8Array, options?: pako.DeflateOptions): Uint8Array => {
  // The options parameter is not used in this function. If it's supposed to be used, you should pass it to pako.gzip.
  let level: number = DEFAULT_LEVEL;
  return pako.gzip(data, {level} as any);
};

const unzip = (data: Uint8Array): string | Uint8Array => {
  let res: string | Uint8Array = data;
  try {
    res = pako.ungzip(data, {to: 'string'});
  } catch (e) {
    console.error('unzip:', e);
  }

  return res;
};

export {DEFAULT_LEVEL, unzip, zip};
