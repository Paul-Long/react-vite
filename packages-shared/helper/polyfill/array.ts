declare interface Array<T> {
  toObject<T>(key: string, convert?: (T1) => any): any;
}

Array.prototype.toObject = function (key, convert = (o) => o) {
  return this.reduce((p, c) => {
    p[c[key]] = convert(c);
    return p;
  }, {});
};
