import {useData} from '@/dashboard/price-chart/state';
import {useChart} from '@rx/hooks/use-chart';
import {PriceScaleMode} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';

export function Charts() {
  const line = useRef<any>();
  const {chart, container} = useChart({
    leftPriceScale: {mode: PriceScaleMode.Normal},
    layout_background: {color: '#00162B'},
  });
  const {data} = useData();

  useEffect(() => {
    if (line.current) {
      line.current.setData(data);
      return;
    }
    if (chart.current) {
      line.current = chart?.current?.addLineSeries({
        color: '#E8BC31',
        lineWidth: 2,
        priceFormat: {
          type: 'custom',
          formatter: (p: any) => {
            return `${(p * 100).toFixed(2)}%`;
          },
        },
      });

      line.current.setData(data);
    }
  }, [chart.current, data]);

  return (
    <div
      className="flex-1 m-w100% df box-border"
      style={{border: '1px solid rgba(255,255,255,0.2)'}}
    >
      <div className="flex-1 w100% h100%" ref={container} />
    </div>
  );
}
