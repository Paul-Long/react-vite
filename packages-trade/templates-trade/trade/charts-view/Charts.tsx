import {useChartData} from '@/trade/charts-view/state';
import {StyledCharts, StyledChartsContainer} from '@/trade/charts-view/styles';
import {SelectTypes} from '@/trade/components/select-types/SelectTypes';
import {resize$} from '@/trade/streams/streams';
import {useChart} from '@rx/hooks/use-chart';
import {useEffect, useRef, useState} from 'react';
import {debounceTime} from 'rxjs';

export function Charts() {
  const [mode, setMode] = useState('YT');
  const line = useRef<any>();

  const {data} = useChartData();
  const {chart, container, loaded, resize} = useChart({
    leftPriceScale: {
      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
    },
    rightPriceScale: {
      visible: true,
      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
    },
  });

  useEffect(() => {}, []);

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
        // lastValueVisible: false,
        // priceLineVisible: false,
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

  return (
    <StyledCharts
      className="position-relative df fdc flex-1 h100% overflow-hidden"
      onResize={resize}
    >
      <StyledChartsContainer ref={container as any} className="flex-1" />
      <div className="pos-absolute top-12px right-12px z-10">
        <SelectTypes theme="dark" value={mode} onChange={(v: string) => setMode(v)} />
      </div>
    </StyledCharts>
  );
}
