import {useChart} from '@rx/hooks/use-chart';
import {useEffect} from 'react';
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
            time: d.Date,
            value: Number(d.Total),
          }))
        );
      chart?.current
        ?.addLineSeries({
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
            time: d.Date,
            value: Number(d.Strategy),
          }))
        );
      chart?.current
        ?.addLineSeries({
          color: '#27F2A9',
          lineWidth: 2,
          priceScaleId: 'left',
          priceFormat: {
            type: 'price',
            precision: 2,
            minMove: 0.001,
          },
        })
        .setData(data?.map((d) => ({time: d.Date, value: Number(d.Trading)})));
      chart.current.applyOptions({height: 382});
      chart?.current.timeScale().fitContent();
      rendered = true;
    }
  }, [chart.current]);

  return <div className="flex-1 overflow-hidden" ref={container} />;
}
