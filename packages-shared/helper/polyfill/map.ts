declare interface Map<K, V> {
  toObject<T>(convert?: (v: V) => T): Record<string, T>;
  toArray<T>(convert?: (v: V) => T): T[];
}

// @ts-ignore
Map.prototype.toObject = function (convert = (o) => o) {
  return Array.from(this.entries()).reduce((p, [key, value]) => {
    p[key] = convert(value);
    return p;
  }, {});
};

Map.prototype.toArray = function (convert = (o) => o) {
  return Array.from(this.values(), convert);
};
