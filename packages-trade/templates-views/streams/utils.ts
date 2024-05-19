import {Big} from 'big.js';

export function calcLiqPrice(
  direction: 'LONG' | 'SHORT',
  mcr: number,
  yt: number,
  st: number,
  margin: number
) {
  if (direction === 'LONG') {
    return Big(mcr).times(Math.abs(st)).minus(margin).div(yt).toFixed(9);
  }
  return Big(st)
    .abs()
    .add(margin)
    .div(mcr * Math.abs(yt))
    .toFixed(9);
}
