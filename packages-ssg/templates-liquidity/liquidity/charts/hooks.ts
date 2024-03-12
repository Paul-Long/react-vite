import {select$} from '@/liquidity/stream/streams';
import {useLoadJs} from '@rx/hooks/use-load-js';
import {useStream} from '@rx/hooks/use-stream';
import {loadEcharts} from '@rx/resource/js';
import {useCallback, useEffect, useRef, useState} from 'react';

interface Options {
  onInit?: (chart: any) => void;
}
export function useChart(options?: Options) {
  const [select] = useStream(select$);
  const chart = useRef<any>();
  const container = useRef<any>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    init();
  }, [container.current, select]);

  useLoadJs(() => {
    init();
    setLoaded(true);
  }, [loadEcharts, [container.current, select]]);

  const init = useCallback(() => {
    if (!chart.current && container?.current) {
      chart.current = window?.echarts?.init(container?.current);
      options?.onInit?.(chart.current);
    }
  }, []);

  return {container, chart, loaded};
}
