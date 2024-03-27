export const guid = {
  build() {
    return [r4, r4, split, r4, split, r4, split, r4, split, r4, r4, r4].map((o) => o()).join('');
  },
};

function split() {
  return '-';
}

function r4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
