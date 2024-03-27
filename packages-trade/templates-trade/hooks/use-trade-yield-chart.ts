import {contract$, maturity$, resize$} from '@/streams/streams';
import {useChart} from '@rx/hooks/use-chart';
import {useStream} from '@rx/hooks/use-stream';
import {useEffect, useRef, useState} from 'react';
import {debounceTime} from 'rxjs';

const ChartOptions = {
  leftPriceScale: {
    scaleMargins: {
      top: 0.3,
      bottom: 0.25,
    },
  },
};

export function useTradeYieldChart(options: any = {}) {
  const line = useRef<any>();
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  const [mode, setMode] = useState('YT');
  const [data, setData] = useState<any[]>([]);
  const {chart, loaded, resize, container} = useChart({...ChartOptions, ...options});

  useEffect(() => {
    (async () => {
      if (contract && maturity) {
        const json = await mockData[contract]?.[maturity]?.();
        const newData = json?.default ?? [];
        setData(newData);
      }
    })();
  }, [contract, maturity]);

  useEffect(() => {
    window?.addEventListener('resize', resize);
    const subscription = resize$.pipe(debounceTime(500)).subscribe(() => resize());
    return function () {
      window?.removeEventListener('resize', resize);
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loaded || !chart?.current) {
      return;
    }
    const ytd = [];
    const yd = [];
    for (let i = 0; i < data?.length; i++) {
      const row: any = data[i];
      const {date: time, yield: value, price} = row;
      ytd.push({time, value: value});
      yd.push({time, value: price});
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
      color: mode === 'YT' ? '#E8BC31' : '#27F2A9',
      priceFormat:
        mode === 'YT'
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
    line?.current?.setData(mode === 'YT' ? yd : ytd);
    chart?.current.timeScale().fitContent();
  }, [loaded, data, chart?.current, mode]);

  return {resize, container, mode, setMode};
}

export const mockData: Record<string, any> = {
  mSOL: {
    2403: () => import('../views/mock/trade/mSOL-2403.json'),
    2406: () => import('../views/mock/trade/mSOL-2406.json'),
    2412: () => import('../views/mock/trade/mSOL-2412.json'),
    2506: () => import('../views/mock/trade/mSOL-2506.json'),
    2512: () => import('../views/mock/trade/mSOL-2512.json'),
  },
  JitoSOL: {
    2403: () => import('../views/mock/trade/JitoSOL-2403.json'),
    2406: () => import('../views/mock/trade/JitoSOL-2406.json'),
    2412: () => import('../views/mock/trade/JitoSOL-2412.json'),
    2506: () => import('../views/mock/trade/JitoSOL-2506.json'),
    2512: () => import('../views/mock/trade/JitoSOL-2512.json'),
  },
};
