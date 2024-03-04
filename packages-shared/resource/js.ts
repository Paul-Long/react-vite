import {loadJS} from './util';

export function loadTV() {
  return loadJS('https://static.rubydex.com/3rd/tv/26.001/charting.js', 'tv-charting');
}

export function loadEcharts() {
  return loadJS('https://cdn.bootcdn.net/ajax/libs/echarts/5.3.3/echarts.min.js', 'echarts-js');
}
