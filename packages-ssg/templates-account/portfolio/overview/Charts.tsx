import {timeUtil} from '@rx/helper/time';
import {useChart} from '@rx/hooks/use-chart';
import React, {useEffect} from 'react';
import {data} from './data';

let rendered = false;
export function Charts() {
  const {chart, container} = useChart({
    rightPriceScale: {visible: true},
    leftPriceScale: {},
  });

  useEffect(() => {
    if (chart.current && !rendered) {
      chart?.current
        ?.addLineSeries({
          color: '#E8BC31',
          lineWidth: 2,
          priceScaleId: 'right',
          priceFormat: {
            type: 'price',
            precision: 4,
            minMove: 0.001,
          },
        })
        .setData(
          data?.map((d) => ({
            time: timeUtil.formatDate(new Date(d.time).getTime()),
            value: d.balance,
          }))
        );
      chart?.current
        ?.addLineSeries({
          color: '#27F2A9',
          lineWidth: 2,
          priceScaleId: 'left',
          priceFormat: {
            type: 'percent',
            precision: 4,
            minMove: 0.001,
          },
        })
        .setData(
          data?.map((d) => ({time: timeUtil.formatDate(new Date(d.time).getTime()), value: d.pnl}))
        );
      chart?.current.timeScale().fitContent();
      rendered = true;
    }
  }, [chart.current]);

  return <div className="flex-1 overflow-hidden" ref={container} />;
}
