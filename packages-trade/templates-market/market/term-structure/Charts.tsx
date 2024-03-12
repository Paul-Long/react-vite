import {useChart} from '@rx/hooks/use-chart';
import React, {useEffect, useRef} from 'react';

const myCategoriesMap: any = {
  '2024-03-01': '1M',
  '2024-03-02': '3M',
  '2024-03-03': '6M',
  '2024-03-04': '1Y',
};

export function Charts() {
  const mLine = useRef<any>();
  const jLine = useRef<any>();
  const {chart, container} = useChart({
    rightPriceScale: {
      visible: true,
      scaleMargins: {
        top: 0.5,
        bottom: 0.35,
      },
    },
    leftPriceScale: {
      scaleMargins: {
        top: 0.5,
        bottom: 0.35,
      },
    },
    layout_background: {color: '#00162B'},
    crosshair: {
      vertLine: {
        labelVisible: false,
      },
    },
  });

  useEffect(() => {
    if (chart.current) {
      if (!mLine.current) {
        mLine.current = chart?.current?.addLineSeries({
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
      mLine.current.setData(MSOL_DATA);
      if (!jLine.current) {
        jLine.current = chart?.current?.addLineSeries({
          color: '#27F2A9',
          lineWidth: 2,
          priceFormat: {
            type: 'custom',
            formatter: (p: any) => {
              return `${(p * 100).toFixed(2)}%`;
            },
          },
        });
      }
      jLine.current.setData(JITOSOL_DATA);
      chart.current.applyOptions({
        timeScale: {
          tickMarkFormatter: (time: string) => {
            return myCategoriesMap[time];
          },
        },
      });
      chart?.current.timeScale().fitContent();
    }
  }, [chart.current]);

  return (
    <div
      className="flex-1 pos-relative box-border"
      style={{border: '1px solid rgba(255,255,255,0.2)'}}
    >
      <div className="w100% h100%" ref={container} />
    </div>
  );
}

const MSOL_DATA: any = [
  {time: '2024-03-01', value: 0.071},
  {time: '2024-03-02', value: 0.0705},
  {time: '2024-03-03', value: 0.0693},
  {time: '2024-03-04', value: 0.0666},
];

const JITOSOL_DATA: any = [
  {time: '2024-03-01', value: 0.0738},
  {time: '2024-03-02', value: 0.073},
  {time: '2024-03-03', value: 0.0716},
  {time: '2024-03-04', value: 0.0689},
];
