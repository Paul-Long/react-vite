const prefix = 'https://img.rubydex.com/';

export function fixImg(record: string) {
  return [prefix, record].join('');
}

export function fixImg1(record: string) {
  return [prefix + 'v1/', record].join('');
}

export function fixCoin(coin: string) {
  return [prefix + 'coin/', coin, '.svg'].join('');
}

export function fixChain(chainKey: string) {
  return [prefix + 'chain/', chainKey, '.svg'].join('');
}
