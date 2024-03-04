import * as echarts from 'echarts';

declare global {
  interface Window {
    echarts: typeof echarts;
  }
}
