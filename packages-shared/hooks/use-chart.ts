import {loadEcharts} from '@rx/resource/js';
import {useRef, useState} from 'react';
import {useLoadJs} from './use-load-js';

interface Options {
  onInit?: (chart: any) => void;
}
export function useChart(options?: Options) {
  const chart = useRef<any>();
  const container = useRef<any>();
  const [loaded, setLoaded] = useState(false);

  useLoadJs(() => {
    if (!chart.current && container?.current) {
      chart.current = window?.echarts?.init(container?.current);
      options?.onInit?.(chart.current);
    }
    setLoaded(true);
  }, [loadEcharts, [container?.current]]);

  return {container, chart, loaded};
}
