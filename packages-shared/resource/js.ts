import {loadJS} from './util';

export function loadTV() {
  return loadJS('/charting_library/charting_library.js', 'tv-charting');
}

export function loadEcharts() {
  return loadJS('https://static.rate-x.io/3rd/echarts/5.5.0/echarts.min.js', 'echarts-js');
}
