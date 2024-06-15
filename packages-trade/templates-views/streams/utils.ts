import {Big} from 'big.js';

export function calcLiqPrice(
  direction: 'LONG' | 'SHORT',
  mcr: number,
  yt: number | string,
  st: number | string,
  margin: number | string
) {
  try {
    if (yt == 0) {
      return '-';
    }
    if (direction === 'LONG') {
      return Big(mcr)
        .times(Math.abs(Number(st)))
        .minus(margin)
        .div(yt)
        .toFixed(9);
    }
    return Big(st)
      .abs()
      .add(margin)
      .div(mcr * Math.abs(Number(yt)))
      .toFixed(9);
  } catch (e) {
    return '-';
  }
}
