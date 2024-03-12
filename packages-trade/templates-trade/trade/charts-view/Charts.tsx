import {useChartData} from '@/trade/charts-view/state';
import {StyledCharts, StyledChartsContainer} from '@/trade/charts-view/styles';
import {resize$} from '@/trade/streams/streams';
import {useChart} from '@rx/hooks/use-chart';
import React, {useEffect, useRef} from 'react';
import {debounceTime} from 'rxjs';

export function Charts() {
  const line1 = useRef<any>();
  const line2 = useRef<any>();

  const {data} = useChartData();
  const {chart, container, loaded, resize} = useChart({
    rightPriceScale: {visible: true},
  });

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
    if (!line1.current) {
      line1.current = chart?.current?.addLineSeries({
        color: '#E8BC31',
        lineWidth: 2,
        priceScaleId: 'left',
        lastValueVisible: false,
        priceLineVisible: false,
      });
    }
    line1?.current?.setData(ytd);
    if (!line2?.current) {
      line2.current = chart?.current?.addLineSeries({
        color: '#27F2A9',
        lineWidth: 2,
        lastValueVisible: false,
        priceLineVisible: false,
        priceFormat: {
          type: 'price',
          precision: 4,
          minMove: 0.001,
        },
      });
    }
    line2?.current?.setData(yd);

    if (data.length > 0) {
      chart?.current.timeScale().setVisibleRange({
        from: data[0].date,
        to: data[data.length - 1].date,
      });
    }

    chart?.current.timeScale().fitContent();
  }, [loaded, data, chart?.current]);

  return (
    <StyledCharts
      className="position-relative df fdc flex-1 h100% overflow-hidden"
      onResize={resize}
    >
      <StyledChartsContainer ref={container as any} className="flex-1" />
    </StyledCharts>
  );
}
