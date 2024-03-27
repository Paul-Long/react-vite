export function camelCase(obj) {
  return Object.keys(obj).reduce((p, key) => {
    const newKey = key.replace(/(\_\w)/g, (k) => k[1].toUpperCase());
    const value = obj[key];
    p[newKey] = value;
    if (value !== null && typeof value === 'object') {
      p[newKey] = camelCase(value);
    }
    if (Array.isArray(value)) {
      p[newKey] = value!.map((o) => (typeof o === 'object' ? camelCase(o) : o));
    }
    return p;
  }, {});
}
