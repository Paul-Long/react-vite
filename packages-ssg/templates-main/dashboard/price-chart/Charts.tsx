import {useData} from '@/dashboard/price-chart/state';
import {useChart} from '@rx/hooks/use-chart';
import {useLang} from '@rx/hooks/use-lang';
import React, {useEffect} from 'react';

export function Charts() {
  const {LG} = useLang();
  const {chart, container, loaded} = useChart({});
  const {data, select} = useData();

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
          data: data?.map((d: any) => d['DATE']),
        },
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
            name: select,
            data: data?.map((d: any) => d.value),
          },
        ],
      });
    }
  }, [chart.current, data]);

  return (
    <div
      className="flex-1 m-w100% min-h400px box-border"
      style={{border: '1px solid rgba(255,255,255,0.2)'}}
    >
      <div className="w100% h100%" ref={container} />
    </div>
  );
}
