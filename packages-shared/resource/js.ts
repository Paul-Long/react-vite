import {loadJS} from './util';

export function loadTV() {
  return loadJS('https://static.rubydex.com/3rd/tv/26.001/charting.js', 'tv-charting');
}

export function loadEcharts() {
  return loadJS('https://static.rate-x.io/3rd/echarts/5.5.0/echarts.min.js', 'echarts-js');
}
