import {Big} from 'big.js';

export const numUtil = {
  floor(num, precision, scale = 0) {
    if (isNaN(num)) {
      return '';
    }
    const side = num < 0 ? -1 : 1;
    return Big(num)
      .abs()
      .times(Big(10).pow(-scale))
      .round(precision, 0)
      .times(side)
      .toFixed(precision);
  },
  ceil(num, precision, scale = 0) {
    if (isNaN(num)) {
      return '';
    }
    const side = num < 0 ? -1 : 1;
    return Big(num)
      .abs()
      .times(Big(10).pow(-scale))
      .round(precision, 3)
      .times(side)
      .toFixed(precision);
  },
  roundPriceEp(priceEp, tickSizeEp) {
    return Number(Big(priceEp).div(tickSizeEp).round().times(tickSizeEp));
  },
  delimit(value) {
    const amount = String(value);
    let regexp = '(\\d)(?=(\\d{3})+\\.)';
    if (amount.indexOf('.') < 0) {
      regexp = '(\\d)(?=(\\d{3})+$)';
    }
    return amount.replace(new RegExp(regexp, 'g'), '$1,');
  },
  pad(num) {
    return (num < 10 ? '0' : '') + String(num);
  },
  priceToEp(price) {
    if (isNaN(price) || price === '') {
      return 0;
    }
    const factor = Big(10).pow(4);
    return Number(Big(String(price).trim()).times(factor));
  },
  abbreviateNumber(num, precision = 2) {
    const str = num.toString();
    if (num < 1e3) {
      return this.floor(str, precision);
    }

    const items = [
      {number: 1e3, unit: 'K'},
      {number: 1e6, unit: 'M'},
      {number: 1e9, unit: 'B'},
      {number: 1e12, unit: 'T'},
      {number: 1e15, unit: 'P'},
      {number: 1e18, unit: 'E'},
    ];

    let index;
    for (index = items.length - 1; index > 0; index--) {
      if (num >= items[index].number) {
        break;
      }
    }
    const item = items[index];
    if (!item) {
      return str;
    }
    const {number, unit} = item;
    return (
      this.floor((num / number).toString().replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1'), precision) +
      unit
    );
  },
  startWithNumber(str) {
    return /^\d/.test(str);
  },
  parseInt(str: string) {
    const map = {K: 1e3, M: 1e6, B: 1e9, T: 1e12, P: 1e15, E: 1e18};
    const key = Object.keys(map).find((o) => str.endsWith(o));
    if (key) {
      return parseInt(str.slice(0, -1)) * map[key];
    }
    return parseInt(str);
  },
  trimEnd0(str) {
    const segments = str.split('.');
    if (segments.length < 1) {
      return str;
    }

    if (segments.length < 2) {
      return str;
    }

    const integer = segments[0];
    const decimal = segments[1].replace(/0+$/, '');
    if (decimal === '') {
      return integer;
    }

    return [integer, decimal].join('.');
  },
};
