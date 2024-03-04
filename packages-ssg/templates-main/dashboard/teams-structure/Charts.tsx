import {useChart} from '@rx/hooks/use-chart';
import {useLang} from '@rx/hooks/use-lang';
import React, {useEffect} from 'react';

export function Charts() {
  const {LG} = useLang();
  const {chart, container, loaded} = useChart({});

  useEffect(() => {
    window.addEventListener('resize', () => {
      chart?.current?.resize();
    });
  }, []);

  useEffect(() => {
    if (chart.current) {
      chart.current.setOption({
        title: {show: false},
        xAxis: {
          type: 'category',
          show: false,
          data: ['1m', '3m', '6m', '1y'],
        },
        legend: {data: ['mSOL', 'JitoSOL'], textStyle: {color: '#fff'}},
        yAxis: [
          {type: 'value', show: false, min: (value: any) => value.min * 0.9, max: 0.08},
          {type: 'value', show: false, min: (value: any) => value.min * 0.9, max: 0.08},
        ],
        color: ['#E8BC31', '#27F2A9'],
        grid: {left: 0, top: 0, right: 0, bottom: 0},
        tooltip: {
          trigger: 'axis',
          valueFormatter: (value: number) => `${(value * 100).toFixed(3)}%`,
        },
        series: [
          {
            type: 'line',
            name: 'mSOL',
            data: [0.071, 0.0705, 0.0693, 0.0666],
          },
          {
            type: 'line',
            name: 'JitoSOL',
            yAxisIndex: 1,
            data: [0.0738, 0.073, 0.0716, 0.0689],
          },
        ],
      });
    }
  }, [chart.current]);

  return (
    <div
      className="flex-1"
      style={{border: '1px solid rgba(255,255,255,0.2)', boxSizing: 'border-box'}}
    >
      <div className="w100% h100%" ref={container} />
    </div>
  );
}
