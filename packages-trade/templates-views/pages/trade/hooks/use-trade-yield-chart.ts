import {chartType$, contract$, maturity$, resize$} from '@/pages/trade/streams/streams';
import {useChart} from '@rx/hooks/use-chart';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {kLine$} from '@rx/streams/trade/kline';
import {useEffect, useRef} from 'react';
import {debounceTime} from 'rxjs';

const ChartOptions = {
  leftPriceScale: {
    scaleMargins: {
      top: 0.3,
      bottom: 0.25,
    },
  },
  timeScale: {
    tickMarkFormatter: (time: number) => {
      const date = new Date(time * 1000);
      const now = new Date();

      if (
        date.getUTCFullYear() === now.getUTCFullYear() &&
        date.getUTCMonth() === now.getUTCMonth() &&
        date.getUTCDate() === now.getUTCDate()
      ) {
        return (
          date.getUTCHours().toString().padStart(2, '0') +
          ':' +
          date.getUTCMinutes().toString().padStart(2, '0')
        );
      } else {
        return (
          (date.getUTCMonth() + 1).toString().padStart(2, '0') +
          ':' +
          date.getUTCDate().toString().padStart(2, '0')
        );
      }
    },
  },
};

export function useTradeYieldChart(options: any = {}) {
  const line = useRef<any>();
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  const [type] = useStream(chartType$);
  const klineData = useObservable(kLine$, []);
  const {chart, loaded, resize, container} = useChart({...ChartOptions, ...options});

  useEffect(() => {
    (async () => {})();
  }, [contract, maturity]);

  useEffect(() => {
    window?.addEventListener('resize', resize);
    const subscription = resize$.pipe(debounceTime(500)).subscribe(() => {
      resize();
    });
    return function () {
      window?.removeEventListener('resize', resize);
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loaded || !chart?.current) {
      return;
    }
    const yd = [];
    for (let i = 0; i < klineData?.length; i++) {
      const row: any = klineData[i];
      const {time, close: value} = row;
      yd.push({time, value: Number(value)});
    }
    if (!line.current) {
      line.current = chart?.current?.addLineSeries({
        color: '#E8BC31',
        lineWidth: 2,
        priceScaleId: 'left',
        priceFormat: {
          type: 'custom',
          formatter: (p: any) => {
            return `${(p * 100).toFixed(2)}%`;
          },
        },
      });
    }
    line.current.applyOptions({
      color: type === 'price' ? '#E8BC31' : '#27F2A9',
      priceFormat:
        type === 'price'
          ? {
              type: 'price',
              precision: 6,
              minMove: 0.000001,
            }
          : {
              type: 'custom',
              formatter: (p: any) => {
                return `${(p * 100).toFixed(2)}%`;
              },
            },
    });
    line?.current?.setData(yd);
    chart?.current.timeScale().fitContent();
  }, [loaded, klineData, chart?.current]);

  return {resize, container, type};
}
